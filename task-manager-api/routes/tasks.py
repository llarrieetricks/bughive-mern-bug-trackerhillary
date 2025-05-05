from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import mysql.connector

router = APIRouter()

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_password",  # Replace with your MySQL root password
    database="task_manager"
)
cursor = db.cursor(dictionary=True)

# Pydantic model for request validation
class Task(BaseModel):
    title: str
    description: str = None
    status: str = "pending"
    due_date: str
    user_id: int

# CREATE Task
@router.post("/tasks")
def create_task(task: Task):
    sql = "INSERT INTO tasks (title, description, status, due_date, user_id) VALUES (%s, %s, %s, %s, %s)"
    values = (task.title, task.description, task.status, task.due_date, task.user_id)
    cursor.execute(sql, values)
    db.commit()
    return {"message": "Task created", "task_id": cursor.lastrowid}

# READ All Tasks
@router.get("/tasks")
def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    return cursor.fetchall()

# UPDATE Task
@router.put("/tasks/{task_id}")
def update_task(task_id: int, task: Task):
    sql = "UPDATE tasks SET title=%s, description=%s, status=%s, due_date=%s, user_id=%s WHERE task_id=%s"
    values = (task.title, task.description, task.status, task.due_date, task.user_id, task_id)
    cursor.execute(sql, values)
    db.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task updated"}

# DELETE Task
@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    cursor.execute("DELETE FROM tasks WHERE task_id=%s", (task_id,))
    db.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}
