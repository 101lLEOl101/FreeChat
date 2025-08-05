from fastapi import APIRouter
from Backend.src.api.auth import router as auth_router

router = APIRouter()
router.include_router(auth_router)
