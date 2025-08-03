from datetime import datetime, timezone
from Backend.db.db import Base
from sqlalchemy import String, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List


class Chat(Base):
    __tablename__ = 'chats'

    is_group: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    title: Mapped[str] = mapped_column(String(32), nullable=True)
    description: Mapped[str] = mapped_column(String(128), default=None, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    users: Mapped[List['User']] = relationship(
        secondary='chat_users',
        back_populates='chats'
    )

    messages: Mapped[List['Message']] = relationship(back_populates='chat')
