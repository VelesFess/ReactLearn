from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from user_list import fake_users
app = FastAPI(
    title="Fake JSONPlaceholder API",
    description="Аналог JSONPlaceholder для тестовых данных",
    version="1.0.0"
)

# Модель пользователя
class User(BaseModel):
    id: int
    name: str
    username: str
    email: str
    phone: str
    website: str



# Роуты
@app.get("/users", response_model=List[User])
def get_users():
    """Получить всех пользователей"""
    return fake_users

@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int):
    """Получить пользователя по ID"""
    user = next((u for u in fake_users if u["id"] == user_id), None)
    if not user:
        return {"error": "User not found"}, 404
    return user

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)