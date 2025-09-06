from Backend.src.db.db import async_session
from Backend.src.db.models.users import User
from Backend.src.schemas.user import UserWithChats

from sqlalchemy import select
from sqlalchemy.orm import selectinload

async def get_all_users():
    try:
        async with async_session() as session:
            stmt = select(User).options(selectinload(User.chats))
            req = await session.execute(stmt)
            result = [UserWithChats.model_validate(x) for x in req.scalars().all()]
            return result
    except Exception as e:
        print(e)