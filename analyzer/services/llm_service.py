import requests
import json


def analyze_resume(resume_text):
    prompt = f"""
You are an ATS resume analyzer.

IMPORTANT:
Return ONLY a valid JSON object.
Do not include explanations.
Do not include markdown.
Do not include ```json.

Return exactly this format:

{{
    "score": 0,
    "summary": "",
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "ats_tips": [],
    "improved_summary": ""
}}


Resume:

{resume_text}
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma4:latest",
            "prompt": prompt,
            "stream": False
        }
    )

    result = response.json()

    print(result["response"])

    return {
        "raw_response": result["response"]
}