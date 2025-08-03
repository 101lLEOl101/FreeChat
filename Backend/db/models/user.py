from datetime import datetime, timezone
from Backend.db.db import Base
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List

class User(Base):
    __tablename__ = 'users'

    login: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(128), unique=True, nullable=False)
    nickname: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    public_key: Mapped[str] = mapped_column(unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )
    description: Mapped[str] = mapped_column(String(128), nullable=True)

    chats: Mapped[List['Chat']] = relationship(
        secondary='chat_users',
        back_populates='users'
    )

    messages: Mapped[List['Message']] = relationship(back_populates='user')
