import pandas as pd
import numpy as np
from pathlib import Path
from typing import List, Dict, Any

# --- GLOBAL CACHE VARIABLES ---
# Data will be loaded into this variable only once.
_GLOBAL_PROJECTS_DATA = None 

# Define Paths
BASE_DIR = Path(__file__).parent.parent / 'data'
PROJECTS_FILE = BASE_DIR / 'projects.csv'
CONTACTS_FILE = BASE_DIR / 'contacts.csv'

def _load_data_to_cache():
    """Internal function to handle the heavy synchronous data loading."""
    global _GLOBAL_PROJECTS_DATA
    
    if not PROJECTS_FILE.exists():
        _GLOBAL_PROJECTS_DATA = []
        return

    print("📚 INFO: Loading project data for the first time...")
    df = pd.read_csv(PROJECTS_FILE)
    
    # Clean NaN/Infinity for JSON safety
    df = df.replace({np.nan: None})
    
    # Convert dates to ISO string if they exist
    if 'activity_date' in df.columns:
        df['activity_date'] = pd.to_datetime(df['activity_date'], errors='coerce').dt.strftime('%Y-%m-%d')
        
    _GLOBAL_PROJECTS_DATA = df.to_dict(orient='records')
    print("✅ INFO: Data loading complete. Caching enabled.")


def load_projects() -> List[Dict[str, Any]]:
    """
    Reads the Master CSV from cache. Loads only on first call.
    """
    global _GLOBAL_PROJECTS_DATA
    
    # If the cache is empty, load the data now.
    if _GLOBAL_PROJECTS_DATA is None:
        _load_data_to_cache()
    
    return _GLOBAL_PROJECTS_DATA

def load_user(email: str) -> Dict[str, Any]:
    """
    Finds a user by email in contacts.csv.
    Includes robust error handling to prevent server crashes.
    """
    # 1. Check for file existence (Fast Fail)
    if not CONTACTS_FILE.exists():
        print("❌ ERROR: Contacts file missing.")
        # Return a safe, unprivileged profile if the prerequisite file is gone
        return {
            "email": email,
            "role": "Viewer",
            "permitted_depts": ["ALL"],
            "status": "FILE_MISSING"
        }

    # 2. Main Processing Block (Catch All Errors)
    try:
        # Load the small CSV file
        df = pd.read_csv(CONTACTS_FILE)
        
        # Check for empty/malformed headers
        if 'email' not in df.columns or 'role' not in df.columns:
            raise ValueError("Contacts CSV has incorrect headers.")

        # Filter by email
        user_row = df[df['email'].astype(str).str.lower() == email.lower().strip()]
        
        if user_row.empty:
            return {
                "email": email,
                "role": "Viewer",
                "permitted_depts": ["UNREGISTERED"],
                "status": "NOT_FOUND"
            }
            
        user = user_row.iloc[0].to_dict()
        
        # Robust Permission Parsing
        permitted_depts = user.get('permitted_depts')
        if isinstance(permitted_depts, str):
            user['permitted_depts'] = [s.strip() for s in permitted_depts.split(';')]
        else:
            user['permitted_depts'] = ['UNASSIGNED'] 
            
        user['status'] = 'AUTHENTICATED'
        return user
        
    except Exception as e:
        print(f"❌ FATAL RUNTIME ERROR in load_user: {e}")
        # Final Fallback: If anything fails during Pandas runtime, return a safe Viewer profile
        return {
            "email": email,
            "role": "Viewer",
            "permitted_depts": ["ERROR_STATE"],
            "status": "CRASHED"
        }