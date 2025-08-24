from sqlalchemy.orm import selectinload

from Backend.src.db.db import async_session
from Backend.src.db.models.chats import Chat
from Backend.src.db.models.chat_users import ChatUser
from Backend.src.db.models.users import User

from sqlalchemy import select
from fastapi import HTTPException

from Backend.src.schemas.chat import ChatWithMessages


async def create_new_chat(user_id1: int,
                          user_id2: int,
                          title: str):
    if user_id1 == user_id2:
        raise HTTPException(
            status_code=409,
            detail='cannot create chat with yourself'
        )

    try:
        async with async_session() as session:

            users_stmt = select(User.id).where(User.id.in_([user_id1, user_id2]))
            result = await session.execute(users_stmt)
            user_ids = {row[0] for row in result.fetchall()}

            if len(user_ids) < 2:
                raise HTTPException(
                    status_code=409,
                    detail='one or both users not found'
                )

            new_chat = Chat(title=title)
            new_link1 = ChatUser(user_id=user_id1)
            new_link2 = ChatUser(user_id=user_id2)

            session.add(new_chat)
            await session.flush()
            chat_id = new_chat.id
            new_link1.chat_id = chat_id
            new_link2.chat_id = chat_id
            session.add_all([new_link1, new_link2])
            await session.commit()
        return {'message': 'chat successfully created'}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f'oops, idk what happened, this can help {str(e)}'
        )


async def get_chat_messages(chat_id: int) -> ChatWithMessages | None:
    async with async_session() as session:
        stmt = select(Chat).options(selectinload(Chat.messages)).where(Chat.id == chat_id)
        result = await session.execute(stmt)
        chat_orm = result.scalars().first()
        if chat_orm is None:
            return None
        return ChatWithMessages.model_validate(chat_orm)
