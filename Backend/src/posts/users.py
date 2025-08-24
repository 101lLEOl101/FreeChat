from Backend.src.db.models.users import User
from Backend.src.db.db import async_session
from Backend.src.services.auth import hash_password
import Backend.src.schemas.user as user_schemas

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import InstrumentedAttribute, selectinload


async def get_user_by_field(field: InstrumentedAttribute,
                            value: str | int | bytes | bool) -> user_schemas.UserWithChats | None:
    async with (async_session() as session):
        stmt = select(User).options(selectinload(User.chats)).where(field == value)
        result = await session.execute(stmt)
        user_orm = result.scalars().first()
        if user_orm is None:
            return None
        return user_schemas.UserWithChats.model_validate(user_orm)


async def create_user(login: str,
                      password: str,
                      nickname: str,
                      public_key: str,
                      description: str | None):
    new_user = User(
        login=login,
        password=hash_password(password),
        nickname=nickname,
        public_key=public_key,
    )
    if description:
        new_user.description = description

    try:
        async with async_session() as session:
            session.add(new_user)
            await session.commit()
        return {'message': 'user successfully created'}
    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail='Login or nickname already exists'
        )
    except Exception:
        raise HTTPException(
            status_code=500,
            detail='Internal server error'
        )
