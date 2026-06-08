import { useState } from "react";
import { analyzeResume } from "../api/resumeApi";

export default function AnalyzeResume() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analysis = result?.analysis;

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      setResult(null);

      const data = await analyzeResume(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Make sure Django and Ollama are running.");
    } finally {
      setLoading(false);
    }
  };

  const renderList = (title, items) => (
    <div className="result-card">
      <h3>{title}</h3>
      {items && items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );

  return (
    <div className="page-container">
      <h1>Analyze Resume</h1>
      <p className="subtitle">
        Upload your resume and optionally paste a job description to check your match score.
      </p>

      <form onSubmit={handleAnalyze} className="form-card">
       <label className="file-upload">
  <input
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={(e) => setResume(e.target.files[0])}
  />

  <div className="file-upload-title">Upload your resume</div>
  <p className="file-upload-subtitle">PDF or DOCX up to 10MB</p>

  {resume && <div className="file-name">{resume.name}</div>}
</label>

        <label>Job Description Optional</label>
        <textarea
          rows="8"
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {analysis && (
        <div className="results-section">
          <h2>Analysis Results</h2>

          <div className="score-grid">
            <div className="score-card">
              <h3>Resume Score</h3>
              <p>{analysis.resume_score ?? "N/A"}/100</p>
            </div>

            <div className="score-card">
              <h3>Job Match Score</h3>
              <p>{analysis.job_match_score ?? "N/A"}/100</p>
            </div>
          </div>

          <div className="result-card">
            <h3>Summary</h3>
            <p>{analysis.summary || "No summary available."}</p>
          </div>

          <div className="result-grid">
            {renderList("Matched Skills", analysis.matched_skills)}
            {renderList("Missing Skills", analysis.missing_skills)}
            {renderList("Strengths", analysis.strengths)}
            {renderList("Weaknesses", analysis.weaknesses)}
            {renderList("ATS Tips", analysis.ats_tips)}
            {renderList(
              "Job Specific Recommendations",
              analysis.job_specific_recommendations
            )}
            {renderList("Recommended Roles", analysis.recommended_roles)}
            {renderList("Project Suggestions", analysis.project_suggestions)}
          </div>

          <div className="result-card">
            <h3>Improved Summary</h3>
            <p>{analysis.improved_summary || "No improved summary available."}</p>
          </div>
        </div>
      )}
    </div>
  );
}