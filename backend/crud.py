from sqlalchemy.orm import Session
import models
import schemas
import security

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        username=user.username,
        password=security.hash_password(user.password),  # hash here
        linkedin_link=user.linkedin_link,
        interests=user.interests,
        skills=user.skills,
        major=user.major,
        preferences=user.preferences
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        return False
    if not security.verify_password(password, user.password):
        return False
    return user