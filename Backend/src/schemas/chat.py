from Backend.src.schemas.message import MessageBase

from typing import List
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class CreateChat(BaseModel):
    nickname: str


class ChatBase(BaseModel):
    id: int
    is_group: bool
    title: str
    description: str | None
    last_message_id: int | None
    last_message_content: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ChatWithMessages(ChatBase):
    messages: List[MessageBase] = []

    model_config = ConfigDict(from_attributes=True)
