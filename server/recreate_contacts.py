import pandas as pd
from pathlib import Path

# Define the new, clean data
data = {
    'email': ['admin@gov.uk', 'lead@gov.uk', 'viewer@gov.uk'],
    'role': ['Admin', 'Editor', 'Viewer'],
    'permitted_depts': ['ALL', 'Finance;HR', 'ALL'],
    'permitted_sources': ['ALL', 'FINTAG', 'ALL']
}
df = pd.DataFrame(data)

# Define the target path
TARGET_FILE = Path(__file__).parent / 'data' / 'contacts.csv'

# Save the file cleanly
df.to_csv(TARGET_FILE, index=False)

print(f"✅ SUCCESS: contacts.csv has been cleanly recreated at {TARGET_FILE}")