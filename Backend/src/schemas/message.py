from datetime import datetime
from pydantic import BaseModel, ConfigDict


class MessageBase(BaseModel):
    id: int
    chat_id: int
    user_id: int
    content: str
    created_at: datetime
    is_deleted: bool

    model_config = ConfigDict(from_attributes=True)


class CreateMessage(BaseModel):
    chat_id: int
    content: str
