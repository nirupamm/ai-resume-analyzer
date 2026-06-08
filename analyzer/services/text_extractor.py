import os
from pypdf import PdfReader
from docx import Document


def extract_text(file):
    extension = os.path.splitext(file.name)[1].lower()

    if extension == ".pdf":
        reader = PdfReader(file)
        text = ""

        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        return text.strip()

    if extension == ".docx":
        doc = Document(file)
        text = "\n".join(paragraph.text for paragraph in doc.paragraphs)
        return text.strip()

    raise ValueError("Only PDF and DOCX files are supported.")