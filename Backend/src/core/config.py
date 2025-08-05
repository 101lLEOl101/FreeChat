from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import BaseModel

BASE_DIR = Path(__file__).parent.parent


class AuthJWT(BaseSettings):
    private_key_path: Path = BASE_DIR / 'certs' / 'jwt-private.pem'
    public_key_path: Path = BASE_DIR / 'certs' / 'jwt-public.pem'
    algorithm: str = 'RS256'
    access_token_expire_minutes: int = 10


class Settings(BaseSettings):
    db_url: str = f'sqlite+aiosqlite:///{BASE_DIR}/db.sqlite3'
    # db_echo: bool = False
    db_echo: bool = True
    auth_jwt: AuthJWT = AuthJWT()


settings = Settings()
