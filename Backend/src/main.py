import asyncio

import uvicorn

from Backend.src.db.db import Base, engine, async_session
from fastapi import FastAPI
from Backend.src.api import router
from Backend.src.db.models.users import User
from Backend.src.db.models.chats import Chat
from Backend.src.db.models.chat_users import ChatUser
from Backend.src.db.models.messages import Message
from Backend.src.services.auth import hash_password


async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


async def some_data():
    async with async_session() as session:
        a = User(login='qwerty', password=hash_password('qwerty'), nickname='nick', public_key='sha256')
        b = User(login='qwerty2', password=hash_password('qwerty2'), nickname='nick2', public_key='2sha256')
        c = User(login='qwerty3', password=hash_password('qwerty3'), nickname='nick3', public_key='3sha256')
        session.add_all([a, b, c])
        await session.commit()


async def main():
    await create_db()
    await some_data()


app = FastAPI()
app.include_router(router)

if __name__ == '__main__':
    asyncio.run(main())
    uvicorn.run("Backend.src.main:app", reload=True)
