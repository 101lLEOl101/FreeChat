from Backend.src.schemas.user import UserAuth
from Backend.src.schemas.user import UserLogin
from Backend.src.schemas.user import UserRegister
import Backend.src.services.auth as auth_utils
import Backend.src.posts.users as users_utils

from fastapi import APIRouter, Depends, Form, HTTPException, status, Response, Cookie

router = APIRouter(prefix='/auth', tags=['Auth'])


async def validate_user(data: UserLogin):
    unauthed_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='invalid login or password'
    )

    user = await users_utils.get_user_by_login(data.login)
    if not user:
        raise unauthed_exc

    if not auth_utils.validate_password(password=data.password, hashed_password=user.password):
        raise unauthed_exc

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='user inactive'
        )

    return user


@router.post('/login')
def auth_user_issue_jwt(response: Response,
                        user: UserAuth = Depends(validate_user)):
    jwt_payload = {
        'sub': str(user.id),
        'login': user.login,
        'nickname': user.nickname
    }
    token = auth_utils.encode_jwt(jwt_payload)

    response.set_cookie(
        key='access_token',
        value=token,
        httponly=True,
        secure=True,
        max_age=600
    )

    return {'message': 'Logged in successfully'}


# TODO: сейчас payload -- это просто decode jwt-токена. необходимо переделать так, чтобы делался запрос в БД
# TODO: и по user_id доставался payload
def get_current_user(access_token: str = Cookie(default=None)):
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Missing token'
        )
    try:
        payload = auth_utils.decode_jwt(access_token)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token'
        )

    return payload


@router.get('/me')
def get_me(user_data=Depends(get_current_user)):
    return {'user': user_data}


@router.post('/reg')
async def register_user(data: UserRegister):
    result = await users_utils.create_user(
        login=data.login,
        password=data.password,
        nickname=data.nickname,
        public_key=data.public_key,
        description=data.description
    )
    return {'result': result}

# TODO: добавить logout
