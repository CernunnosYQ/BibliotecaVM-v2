from jwt import encode, exceptions, decode
from typing import Optional
from datetime import datetime, timedelta, UTC
from passlib.context import CryptContext

from config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hasher:
    @staticmethod
    def hash_password(plain_password):
        return pwd_context.hash(plain_password)

    @staticmethod
    def verify_password(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
        expire = datetime.now(UTC) + timedelta(minutes=settings.EXP_MINS)

    token = encode(
        payload={**data, "exp": expire},
        key=settings.SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )

    return token.encode("UTF-8")


def validate_access_token(token: str):
    try:
        decoded_token = decode(
            token, key=settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
        )
        naive_dt = datetime.fromtimestamp(decoded_token["exp"])
        print(datetime.now(), naive_dt)

        minutes_remaining = (naive_dt - datetime.now()).total_seconds() // 60
        print(minutes_remaining)

        if minutes_remaining < settings.EXP_MINS / 2:
            del decoded_token["exp"]
            token = create_access_token(data=decoded_token)

        return {"success": True, "payload": decoded_token, "token": token}
    except exceptions.DecodeError:
        detail = "Invalid Token"
    except exceptions.ExpiredSignatureError:
        detail = "Token Expired"
    return {"success": False, "detail": detail}
