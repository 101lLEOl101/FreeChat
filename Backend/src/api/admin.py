from Backend.src.posts.admin import get_all_users

from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get('/users')
async def get_users():
    result = await get_all_users()
    return result