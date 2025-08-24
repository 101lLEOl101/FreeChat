from Backend.src.api.auth import router as auth_router
from Backend.src.api.user import router as user_router
from Backend.src.api.chat import router as chat_router
from Backend.src.api.message import router as message_router
from fastapi import APIRouter

router = APIRouter(prefix='/api')

router.include_router(auth_router)
router.include_router(user_router)
router.include_router(chat_router)
router.include_router(message_router)
