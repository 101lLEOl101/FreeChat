from typing import Annotated
from annotated_types import MinLen, MaxLen
from pydantic import BaseModel


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
