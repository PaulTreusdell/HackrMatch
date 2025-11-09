from sentence_transformers import SentenceTransformer, util
from schemas import User
import os

#Similarities

# Disable Hugging Face warnings
os.environ["TRANSFORMERS_NO_ADVISORY_WARNINGS"] = "true"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "true"

model = SentenceTransformer('all-MiniLM-L6-v2')

def flatten_user(user: User) -> str:
  components = []
  excluded_fields = {'id', 'social', 'username', 'password'}
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