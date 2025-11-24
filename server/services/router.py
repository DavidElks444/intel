from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

from .data_loader import load_projects, load_user

router = APIRouter()

# --- MODELS ---
# We use a loose schema (Dict[str, Any]) because your data is "Wide" 
# and has varying columns from Source A vs Source B.
class ProjectResponse(BaseModel):
    count: int
    data: List[Dict[str, Any]]

class UserResponse(BaseModel):
    email: str
    role: str
    permitted_depts: List[str]

# --- ENDPOINTS ---

@router.get("/projects", response_model=ProjectResponse)
async def get_projects(
    user_email: Optional[str] = Query(None)
):
    """
    Returns all projects.
    TODO: In future, filter this list based on user_email permissions.
    """
    projects = load_projects()
    return {"count": len(projects), "data": projects}

@router.get("/user/{email}", response_model=UserResponse)
async def get_user_profile(email: str):
    """
    Validates a login email against contacts.csv
    """
    user = load_user(email)
    if not user:
        # Fallback for demo: if user not found, give them Viewer access
        return {
            "email": email,
            "role": "Viewer",
            "permitted_depts": ["ALL"]
        }
    return user