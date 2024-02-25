from sqlalchemy import Boolean, Column, Integer, String

from models.base import Base
from security import Hasher


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    is_superuser = Column(Boolean, default=False)


def get_user(username, db):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return {"detail": f'User "{username}" does not exist.'}

    return user


def create_new_user(user, db):
    new_user = User(
        username=user.username, password_hash=Hasher.hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"success": True}


def delete_user(username, db):
    user = db.query(User).filter(User.username == username)
    if not user:
        return {"detail": f'User "{username}" does not exist.'}

    user.delete()
    db.commit()
    return {"success": True}
