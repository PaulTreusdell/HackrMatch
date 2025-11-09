from sentence_transformers import SentenceTransformer, util
from backend.schemas.models import User
import os

#Similarities

# Disable Hugging Face warnings
os.environ["TRANSFORMERS_NO_ADVISORY_WARNINGS"] = "true"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "true"

model = SentenceTransformer('all-MiniLM-L6-v2')

def flatten_user(user: User) -> str:
  components = []
  excluded_fields = {'username', 'password'}
  for key, value in user.model_dump().items():
    if key in excluded_fields:
      continue
    if isinstance(value, list):
      components.extend(value)
    elif isinstance(value, str):
      components.append(value)
  return " ".join(components)

def get_similarity(inputUser: User, db_users:list[User]) -> dict[int, float]:
  #get all users that arent input
  other_users = [user for user in db_users if user.id != inputUser.id]

  input_text = flatten_user(inputUser)
  users_text = [flatten_user(user) for user in other_users]

  input_embedding = model.encode(input_text, convert_to_tensor=True)
  user_embeddings = model.encode(users_text, convert_to_tensor=True)

  similarities = util.cos_sim(input_embedding, user_embeddings).flatten()
  d = {}
  for user, sim in zip(other_users, similarities):
    d[user.id] = float(sim)
  return d

users = [
  User(
    username="bobenheimer",
    password="samoan3453!",
    skills=["java", "springboot", "hibernate", "OAuth"],
    preferences=["react", "ui/ux"],
    interests=["Scalable Systems", "Websites", "Money"],
    skill="advanced",
    major="Computer Science"
),
User(
    username="aliceinwonderland",
    password="thing7367$",
    skills=["python", "mysql", "sklearn", "django"],
    preferences=["backend", "django", "flask"],
    interests=["Machine Learning", "Backend", "Clean Code"],
    skill="beginner",
    major="Computer Engineering"
),
User(
    username="shrek",
    password="tobegood3243#",
    skills=["C#", "ASP.NET", "Entity Core Framework", "Github Actions"],
    preferences=["frontend", "Razor", "Web3"],
    interests=["CI/CD", "React", "Angular", "Redux"],
    skill="intermediate",
    major="Computer Science"
)
]

input_user = User(
    username="BigManJames",
    password="password1234",
    skills=["React", "JavaScript", "Redux", "Clean Code"],
    preferences=["Backend", "Springboot"],
    interests=["AI", "chess"],
    skill="beginner",
    major="Computer Science"
)

d = get_similarity(input_user, users)
for key, val in d.items():
  print(key,val)