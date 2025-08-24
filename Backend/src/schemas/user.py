from Backend.src.schemas.chat import ChatBase
from Backend.src.schemas.message import MessageBase

from datetime import datetime
from typing import Annotated, List
from annotated_types import MinLen, MaxLen
from pydantic import BaseModel, ConfigDict


class UserBase(BaseModel):
    id: int
    login: str
    password: bytes
    nickname: str
    public_key: str
    created_at: datetime
    description: str | None = None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class UserWithChats(UserBase):
    chats: List[ChatBase] = []

    model_config = ConfigDict(from_attributes=True)


class UserLogin(BaseModel):
    login: str
    password: str


class UserRegister(BaseModel):
    login: str
    password: str
    nickname: str
    public_key: str
    description: str | None


class UserAuth(BaseModel):
    id: int
    login: Annotated[str, MinLen(4), MaxLen(20)]
    password: bytes
    nickname: str
    is_active: bool
