from pydantic import BaseModel, Field
from uuid import uuid4
from typing import List

class User(BaseModel):
  id: str = Field(default_factory=lambda: str(uuid4()))
  username: str
  password: str
  skills: list[str]
  preferences: list[str]
  interests: list[str]
  skill: str
  major: str