from pydantic import BaseModel, Field
from typing import List
from uuid import UUID, uuid4

class UserCreate(BaseModel):
    social: str
    username: str
    password: str
    skills: List[str]
    preferences: List[str]
    interests: List[str]
    skill: str
    major: str

class UserRead(UserCreate):
    id: UUID = Field(default_factory=uuid4)

    class Config:
        orm_mode = True