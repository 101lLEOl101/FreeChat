from Backend.src.schemas.chat import CreateChat
from Backend.src.db.models.users import User
from Backend.src.api.auth import get_current_user
from Backend.src.posts.users import get_user_by_field
import Backend.src.posts.chats as chat_posts

from typing import Annotated
from fastapi import APIRouter, Depends, Cookie, Path, HTTPException

router = APIRouter(prefix='/chats', tags=['Chats'])


@router.post('/create')
async def create_chat(data: CreateChat,
                      access_token: str = Cookie(default=None),
                      user_data=Depends(get_current_user)):
    second_user = await get_user_by_field(User.nickname, data.nickname)
    result = await chat_posts.create_new_chat(
        user_id1=user_data.id,
        user_id2=second_user.id,
        title=second_user.nickname
    )
    return result


@router.get('{chat_id}/messages')
async def get_messages_in_chat(chat_id: Annotated[int, Path(title="The ID of chat to get messages")],
                               access_token: str = Cookie(default=None),
                               user_data=Depends(get_current_user)):
    users_chats = {chat.id for chat in user_data.chats}
    if chat_id not in users_chats:
        raise HTTPException(
            status_code=403,
            detail="You don't have access to this chat"
        )
    else:
        chat = await chat_posts.get_chat_messages(chat_id)
        return chat.messages
