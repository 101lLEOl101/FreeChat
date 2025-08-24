from Backend.src.schemas.message import CreateMessage
from Backend.src.api.auth import get_current_user
from Backend.src.posts.messages import create_new_message

from fastapi import APIRouter, Depends, Cookie, HTTPException

router = APIRouter(prefix='/message', tags=['Messages'])


@router.post('/create')
async def create_message(data: CreateMessage,
                         access_token: str = Cookie(default=None),
                         user_data=Depends(get_current_user)):
    users_chats = {chat.id for chat in user_data.chats}
    if data.chat_id not in users_chats:
        raise HTTPException(
            status_code=403,
            detail="You don't have access to this chat"
        )
    else:
        result = await create_new_message(chat_id=data.chat_id,
                                          user_id=user_data.id,
                                          content=data.content)
        return result
