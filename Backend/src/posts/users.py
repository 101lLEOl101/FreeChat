from Backend.src.db.models.users import User
from Backend.src.db.db import async_session
from Backend.src.services.auth import hash_password

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError


async def get_user_by_login(login: str) -> User | None:
    async with async_session() as session:
        stmt = select(User).where(User.login == login)
        result = await session.execute(stmt)
    return result.scalars().first()


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
    except IntegrityError as e:
        return {'error': 'login or nickname already exists'}
    except Exception as e:
        return {'error': 'idk what to do with this :('}  # details=str(e)
