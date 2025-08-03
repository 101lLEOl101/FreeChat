from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped, mapped_column
from Backend.core.config import settings

engine = create_async_engine(url=settings.db_url,
                             echo=settings.db_echo)

async_session = async_sessionmaker(bind=engine,
                                   expire_on_commit=False,
                                   autocommit=False,
                                   autoflush=False)

class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(primary_key=True)
    pass
