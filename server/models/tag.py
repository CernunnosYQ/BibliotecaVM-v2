from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import Session

from models import Base


class Tag(Base):
    id = Column(Integer, primary_key=True)
    tag = Column(String, unique=True, nullable=False)


class BookTag(Base):
    book_id = Column(Integer, ForeignKey("books.id"), primary_key=True)
    tag_id = Column(Integer, ForeignKey("tags.id"), primary_key=True)


def update_tags(book_id: int, new_tags: list[str], db: Session) -> None:
    """Add or delete tags associated with a given book to fit with 'new_tags' list."""

    current_tags = (
        db.query(Tag.tag)
        .join(BookTag, BookTag.tag_id == Tag.id)
        .filter(BookTag.book_id == book_id)
        .all()
    )
    current_tags = {tag[0].strip(" ,.¿?¡!").lower() for tag in current_tags}
    new_tags = {tag.strip(" ,.¿?¡!").lower() for tag in new_tags}

    tags_to_add = new_tags - current_tags
    tags_to_remove = current_tags - new_tags

    add_tags(book_id, tags_to_add, db)
    remove_tags(book_id, tags_to_remove, db)


def add_tags(book_id: int, tags_to_add: list[str], db: Session) -> None:
    """Add given tags to the book with the provided ID."""

    book_tags_to_add = []
    tags_to_add = {tag.strip(" ,.¿?¡!").lower() for tag in tags_to_add}

    for tag_name in tags_to_add:
        tag = db.query(Tag).filter(Tag.tag == tag_name).first()

        if not tag:
            tag = Tag(tag=tag_name)
            db.add(tag)
            db.flush()

        book_tag = BookTag(book_id=book_id, tag_id=tag.id)
        book_tags_to_add.append(book_tag)

    db.add_all(book_tags_to_add)


def remove_tags(book_id, tags_to_remove, db):
    """Remove given tags from the book with id `book_id`."""

    book_tags_to_remove = db.query(Tag).filter(Tag.tag.in_(tags_to_remove)).all()

    db.query(BookTag).filter(
        BookTag.book_id == book_id,
        BookTag.tag_id.in_([tag.id for tag in book_tags_to_remove]),
    ).delete(synchronize_session=False)


def remove_all_tags(book_id, db):
    """Remove all tags from the book with id `book_id`."""

    db.query(BookTag).filter(BookTag.book_id == book_id).delete()
