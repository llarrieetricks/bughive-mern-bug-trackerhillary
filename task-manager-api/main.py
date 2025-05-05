from fastapi import FastAPI
from routes import tasks  # This assumes you have a 'routes/tasks.py' file

app = FastAPI(title="Task Manager API")

app.include_router(tasks.router)
