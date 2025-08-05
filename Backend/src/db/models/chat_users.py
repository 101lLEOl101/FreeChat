from datetime import datetime, timezone
from Backend.src.db.db import Base
from sqlalchemy import DateTime, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column


class ChatUser(Base):
    __tablename__ = 'chat_users'

    chat_id: Mapped[int] = mapped_column(ForeignKey("chats.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
