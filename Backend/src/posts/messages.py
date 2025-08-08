from Backend.src.db.db import async_session
from Backend.src.db.models.chats import Chat
from Backend.src.db.models.messages import Message
from Backend.src.db.models.chat_users import ChatUser
from Backend.src.db.models.users import User

from sqlalchemy import select, update
from fastapi import HTTPException
from sqlalchemy.orm import selectinload
from Backend.src.schemas.chat import ChatWithMessages


async def create_new_message(chat_id: int,
                             user_id: int,
                             content: str):
    new_message = Message(
        chat_id=chat_id,
        user_id=user_id,
        content=content
    )
    async with async_session() as session:
        session.add(new_message)
        await session.flush()
        await session.execute(
            update(Chat).
            where(Chat.id == chat_id).
            values(last_message_id=new_message.id,
                   last_message_content=new_message.content)
        )
        await session.commit()
    return 'message successfully added'
