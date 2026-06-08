import { useState } from "react";
import { rewriteResume } from "../api/resumeApi";

export default function RewriteResume() {
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const rewrite = result?.rewrite;

  const handleRewrite = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);
      setResult(null);

      const data = await rewriteResume(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Rewrite failed. Make sure Django and Ollama are running.");
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
      <h1>Resume Rewrite</h1>
      <p className="subtitle">
        Upload your resume and generate ATS-friendly improvements.
      </p>

      <form onSubmit={handleRewrite} className="form-card">
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

        <button type="submit" disabled={loading}>
          {loading ? "Rewriting..." : "Rewrite Resume"}
        </button>
      </form>

      {rewrite && (
        <div className="results-section">
          <h2>Rewrite Results</h2>

          <div className="result-card">
            <h3>Improved Summary</h3>
            <p>{rewrite.improved_summary || "No improved summary available."}</p>
          </div>

          <div className="result-grid">
            {renderList("Improved Skills Section", rewrite.improved_skills_section)}
            {renderList("Improved Experience Bullets", rewrite.improved_experience_bullets)}
            {renderList("ATS Keywords to Add", rewrite.ats_keywords_to_add)}
            {renderList("Final Recommendations", rewrite.final_recommendations)}
          </div>
        </div>
      )}
    </div>
  );
}