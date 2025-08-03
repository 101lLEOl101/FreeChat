import asyncio
from db.db import Base, engine
from db.models.chat import Chat
from db.models.chatUser import ChatUser
from db.models.message import Message
from db.models.user import User

async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

async def main():
    await create_db()


if __name__ == '__main__':
    asyncio.run(main())
