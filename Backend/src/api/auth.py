from Backend.src.db.models.users import User
import Backend.src.schemas.user as user_schemas
import Backend.src.services.auth as auth_utils
import Backend.src.posts.users as users_utils

from fastapi import APIRouter, Depends, HTTPException, status, Response, Cookie

router = APIRouter(prefix='/auth', tags=['Auth'])


async def get_current_user(access_token: str = Cookie(default=None)) -> user_schemas.UserWithChats:
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
    user = await users_utils.get_user_by_field(User.id, int(payload['sub']))

    return user


async def validate_user(data: user_schemas.UserLogin) -> user_schemas.UserWithChats:
    unauthed_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='invalid login or password'
    )

    user = await users_utils.get_user_by_field(User.login, data.login)
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
                        user: user_schemas.UserAuth = Depends(validate_user)):
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
        secure=False, # with True web don`t working on macos. When https enable.
        max_age=600
    )

    return {'message': 'Logged in successfully'}


@router.post('/register')
async def register_user(data: user_schemas.UserRegister):
    result = await users_utils.create_user(
        login=data.login,
        password=data.password,
        nickname=data.nickname,
        public_key=data.public_key,
        description=data.description
    )
    return {'result': result}


@router.post('/logout')
def user_logout(response: Response,
                access_token: str = Cookie(default=None)):
    response.delete_cookie(key='access_token')
    return {'message': 'successfully logout'}
