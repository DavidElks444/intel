import pandas as pd
import numpy as np
import uuid
import re
from pathlib import Path

# --- 1. CONFIGURATION ---
# Script is in 'intel/server/', data is in 'intel/server/data/'
BASE_DIR = Path(__file__).parent / 'server' / 'data'

PATH_TO_FINTAG = BASE_DIR / "fintag_tracker.csv" 
PATH_TO_CORP_GOV = BASE_DIR / "Governance Delivery Tool.csv" # Back to CSV
OUTPUT_FILE = BASE_DIR / 'projects.csv'

def clean_snake_case(col_name):
    """Standardizes final columns to snake_case"""
    c = str(col_name).lower().strip()
    c = re.sub(r'[\[\]\(\)£$]', '', c)
    c = re.sub(r'[\s\-]+', '_', c)
    c = c.strip('_')
    return c

def migrate():
    print("🚀 Starting Robust Migration (CSV Sources)...")

    # --- 2. LOAD FILES ---
    if not PATH_TO_FINTAG.exists():
        print(f"❌ Error: Fintag file not found at {PATH_TO_FINTAG}")
        return
    if not PATH_TO_CORP_GOV.exists():
        print(f"❌ Error: Corp Gov file not found at {PATH_TO_CORP_GOV}")
        return

    try:
        # Both are now CSVs
        df_fintag = pd.read_csv(PATH_TO_FINTAG)
        df_corp_gov = pd.read_csv(PATH_TO_CORP_GOV)
    except Exception as e:
        print(f"❌ Error reading files: {e}")
        return

    # --- 3. CRITICAL: STRIP SOURCE HEADERS ---
    # Removes trailing spaces (e.g., "Activity " -> "Activity")
    df_fintag.columns = df_fintag.columns.str.strip()
    df_corp_gov.columns = df_corp_gov.columns.str.strip()

    # --- 4. MAPPING ---
    
    fintag_map = {
        'Name': 'project_name',
        'Department': 'department',
        'Status': 'status', 
        'Owner': 'owner',
        'Date Initiated': 'activity_date',
        'Contacts': 'contacts',
        'Branch Head': 'responsible_director',
        'Tier': 'importance_level',
        'CL Type': 'cl_type',
        'Size': 'cl_size',
        'Maximum Exposure': 'maximum_exposure'
    }
    
    # Corp Gov Map (Matched to your cleaned CSV headers)
    corp_gov_map = {
        'Activity': 'project_name', 
        'Department': 'department',
        'Completed': 'status', 
        'Project Lead(s)': 'owner',
        'Start Date': 'activity_date',
        'Key External Contacts': 'contacts',
        'Priority': 'importance_level'
    }

    # --- 5. PREPARE DATA ---

    # FINTAG
    df_fintag = df_fintag.rename(columns=fintag_map)
    df_fintag['source'] = 'FINTAG'

    # CORP GOV
    # Dual mapping for 'Project Lead(s)' -> Director
    if 'Project Lead(s)' in df_corp_gov.columns:
        df_corp_gov['responsible_director'] = df_corp_gov['Project Lead(s)']

    df_corp_gov = df_corp_gov.rename(columns=corp_gov_map)
    df_corp_gov['source'] = 'Corp Gov'

    # --- 6. SPECIFIC CLEANING ---

    # Clean Corp Gov Department (Remove [" "])
    if 'department' in df_corp_gov.columns:
        df_corp_gov['department'] = df_corp_gov['department'].astype(str).str.replace(r'[\[\]"]', '', regex=True)

    # Clean Corp Gov Status (Boolean -> String)
    if 'status' in df_corp_gov.columns:
        df_corp_gov['status'] = df_corp_gov['status'].apply(
            lambda x: 'Completed' if str(x).lower() in ['true', '1', 'yes'] else 'Active'
        )

    # --- 7. MERGE (Keep All Columns) ---
    print("Merging datasets...")
    df_combined = pd.concat([df_fintag, df_corp_gov], ignore_index=True)

    # --- 8. FIX DATES ---
    if 'activity_date' in df_combined.columns:
        df_combined['activity_date'] = pd.to_datetime(
            df_combined['activity_date'], 
            dayfirst=True, 
            errors='coerce'
        )

    # --- 9. FINAL POLISH ---
    # Standardize headers to snake_case
    df_combined.columns = [clean_snake_case(c) for c in df_combined.columns]

    # Generate Resource Data (filling gaps)
    count = len(df_combined)
    rng = np.random.default_rng(seed=42)
    
    if 'total_weighted_cost' not in df_combined.columns:
        df_combined['total_weighted_cost'] = rng.uniform(5000, 150000, count).round(2)
    if 'fte_total' not in df_combined.columns:
        df_combined['fte_total'] = rng.uniform(0.1, 5.0, count).round(2)
    if 'number_of_engagements' not in df_combined.columns:
        df_combined['number_of_engagements'] = rng.integers(1, 20, count)
    if 'number_of_contacts' not in df_combined.columns:
        df_combined['number_of_contacts'] = df_combined['number_of_engagements'] + rng.integers(0, 5, count)

    # Assign UUIDs
    print("Assigning UUIDs...")
    df_combined['project_uuid'] = [str(uuid.uuid4()) for _ in range(len(df_combined))]

    # Fill NaNs
    for col in df_combined.select_dtypes(include=['object']).columns:
        df_combined[col] = df_combined[col].fillna('')

    # Reorder
    core_cols = [
        'project_uuid', 'source', 'project_name', 'department', 'status', 
        'owner', 'responsible_director', 'importance_level', 'activity_date'
    ]
    core_cols = [c for c in core_cols if c in df_combined.columns]
    other_cols = sorted([c for c in df_combined.columns if c not in core_cols])
    
    df_final = df_combined[core_cols + other_cols]

    # Save
    df_final.to_csv(OUTPUT_FILE, index=False)
    print(f"✅ SUCCESS: Created {OUTPUT_FILE}")
    print(f"   - Total Rows: {len(df_final)}")
    
    # Valid date check
    if 'activity_date' in df_final.columns:
        valid_dates = df_final['activity_date'].notna().sum()
        print(f"   - Valid Dates: {valid_dates}")

if __name__ == "__main__":
    migrate()