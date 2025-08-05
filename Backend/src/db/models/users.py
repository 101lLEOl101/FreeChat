from datetime import datetime, timezone
from Backend.src.db.db import Base
from sqlalchemy import String, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List


class User(Base):
    __tablename__ = 'users'

    login: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    password: Mapped[bytes] = mapped_column(unique=True, nullable=False)
    nickname: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    public_key: Mapped[str] = mapped_column(unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )
    description: Mapped[str] = mapped_column(String(128), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    chats: Mapped[List['Chat']] = relationship(
        secondary='chat_users',
        back_populates='users'
    )

    messages: Mapped[List['Message']] = relationship(back_populates='user')
