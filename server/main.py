from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import settings
from session import engine
from models.book import Base
from routes import router as api_router


def create_tables():
    Base.metadata.create_all(bind=engine)


def include_router(app):
    app.include_router(api_router, prefix="/api")


def add_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


def start_application() -> FastAPI:
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    create_tables()
    add_middleware(app)
    include_router(app)
    return app


app = start_application()


@app.get("/api/")
def read_root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME} API {settings.PROJECT_VERSION}"
    }


@app.exception_handler(ValueError)
def handle_value_errors(request, exc):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": str(exc)},
    )
