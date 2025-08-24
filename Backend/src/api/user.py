from Backend.src.api.auth import get_current_user

from fastapi import APIRouter, Depends, Cookie

router = APIRouter(tags=['User'])


@router.get('/me')
def get_me(access_token: str = Cookie(default=None),
           user_data=Depends(get_current_user)):
    result = dict(user_data)
    print(result['chats'])
    return result
