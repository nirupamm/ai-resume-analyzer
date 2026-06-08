import requests
import json
import re


def extract_json_from_response(text):
    """
    Extracts JSON even if the LLM adds extra text or markdown.
    """

    text = text.strip()

    # Remove markdown code block if present
    text = text.replace("```json", "").replace("```", "").strip()

    # Find first JSON object
    match = re.search(r"\{.*\}", text, re.DOTALL)

    if not match:
        raise ValueError("No valid JSON object found in LLM response.")

    json_text = match.group(0)

    return json.loads(json_text)


def analyze_resume(resume_text):
    prompt = f"""
You are an expert ATS resume analyzer and career coach.

Analyze the resume below and return ONLY valid JSON.
Do not include markdown.
Do not include explanation outside JSON.

Use this exact JSON structure:

{{
  "score": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "ats_tips": [],
  "improved_summary": "",
  "recommended_roles": [],
  "project_suggestions": []
}}

Rules:
- score must be a number from 0 to 100
- strengths should include 3 to 5 points
- weaknesses should include 3 to 5 points
- missing_skills should include useful technical skills
- ats_tips should be practical and specific
- improved_summary should be a polished resume summary
- recommended_roles should match the candidate profile
- project_suggestions should suggest portfolio projects

Resume:
{resume_text}
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma4:latest",
            "prompt": prompt,
            "stream": False
        },
        timeout=180
    )

    response.raise_for_status()

    result = response.json()
    raw_response = result.get("response", "")

    try:
        return extract_json_from_response(raw_response)

    except Exception:
        return {
            "score": None,
            "summary": "The AI response could not be converted into structured JSON.",
            "strengths": [],
            "weaknesses": [],
            "missing_skills": [],
            "ats_tips": [],
            "improved_summary": "",
            "recommended_roles": [],
            "project_suggestions": [],
            "raw_response": raw_response
        }