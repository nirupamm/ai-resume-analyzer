import requests
import json
import re


def extract_json_from_response(text):
    text = text.strip()
    text = text.replace("```json", "").replace("```", "").strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if not match:
        raise ValueError("No valid JSON object found in LLM response.")

    return json.loads(match.group(0))


def analyze_resume(resume_text, job_description=""):
    if job_description:
        prompt = f"""
You are an expert ATS resume analyzer and technical recruiter.

Compare the resume with the job description.

Return ONLY valid JSON.
Do not include markdown.
Do not include explanation outside JSON.

Use this exact JSON structure:

{{
  "resume_score": 0,
  "job_match_score": 0,
  "summary": "",
  "matched_skills": [],
  "missing_skills": [],
  "strengths": [],
  "weaknesses": [],
  "ats_tips": [],
  "job_specific_recommendations": [],
  "improved_summary": "",
  "recommended_roles": [],
  "project_suggestions": []
}}

Rules:
- resume_score must be 0 to 100
- job_match_score must be 0 to 100
- matched_skills should come from both resume and job description
- missing_skills should be skills required by the job but missing in resume
- job_specific_recommendations should explain how to improve the resume for this job
- Keep all answers practical and specific

Resume:
{resume_text}

Job Description:
{job_description}
"""
    else:
        prompt = f"""
You are an expert ATS resume analyzer and career coach.

Analyze the resume below and return ONLY valid JSON.
Do not include markdown.
Do not include explanation outside JSON.

Use this exact JSON structure:

{{
  "resume_score": 0,
  "job_match_score": null,
  "summary": "",
  "matched_skills": [],
  "missing_skills": [],
  "strengths": [],
  "weaknesses": [],
  "ats_tips": [],
  "job_specific_recommendations": [],
  "improved_summary": "",
  "recommended_roles": [],
  "project_suggestions": []
}}

Rules:
- resume_score must be a number from 0 to 100
- job_match_score must be null because no job description was provided
- strengths should include 3 to 5 points
- weaknesses should include 3 to 5 points
- missing_skills should include useful technical skills
- ats_tips should be practical and specific

Resume:
{resume_text}
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "qwen2.5-coder:7b",
            "prompt": prompt,
            "stream": False
        },
        timeout=300
    )

    response.raise_for_status()

    result = response.json()
    raw_response = result.get("response", "")

    try:
        return extract_json_from_response(raw_response)

    except Exception:
        return {
            "resume_score": None,
            "job_match_score": None,
            "summary": "The AI response could not be converted into structured JSON.",
            "matched_skills": [],
            "missing_skills": [],
            "strengths": [],
            "weaknesses": [],
            "ats_tips": [],
            "job_specific_recommendations": [],
            "improved_summary": "",
            "recommended_roles": [],
            "project_suggestions": [],
            "raw_response": raw_response
        }
def rewrite_resume(resume_text):
    prompt = f"""
You are an expert resume writer and ATS optimization specialist.

Rewrite and improve the resume content below.

Return ONLY valid JSON.
Do not include markdown.
Do not include explanation outside JSON.

Use this exact JSON structure:

{{
  "improved_summary": "",
  "improved_skills_section": [],
  "improved_experience_bullets": [],
  "ats_keywords_to_add": [],
  "final_recommendations": []
}}

Rules:
- Make the summary professional and concise
- Improve bullet points using action verbs
- Add measurable impact where possible
- Keep suggestions realistic based on the resume
- Do not invent fake companies, degrees, or experience

Resume:
{resume_text}
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "qwen2.5-coder:7b",
            "prompt": prompt,
            "stream": False
        },
        timeout=300
    )

    response.raise_for_status()

    result = response.json()
    raw_response = result.get("response", "")

    try:
        return extract_json_from_response(raw_response)

    except Exception:
        return {
            "improved_summary": "",
            "improved_skills_section": [],
            "improved_experience_bullets": [],
            "ats_keywords_to_add": [],
            "final_recommendations": [],
            "raw_response": raw_response
        }