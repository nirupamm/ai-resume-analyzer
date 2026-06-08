import { useState } from "react";
import { generateCoverLetter } from "../api/resumeApi";

export default function CoverLetter() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("job_description", jobDescription);
    formData.append("company_name", companyName);
    formData.append("role_title", roleTitle);

    try {
      setLoading(true);
      setResult(null);

      const data = await generateCoverLetter(formData);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      result?.cover_letter?.cover_letter || ""
    );

    alert("Cover letter copied!");
  };

  return (
    <div className="page-container">
      <h1>Cover Letter Generator</h1>

      <p className="subtitle">
        Generate a tailored cover letter using your resume and job description.
      </p>

      <form onSubmit={handleGenerate} className="form-card">
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

        <label>Company Name</label>

        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Google"
        />

        <label>Role Title</label>

        <input
          type="text"
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
          placeholder="Junior Python Developer"
        />

        <label>Job Description</label>

        <textarea
          rows="10"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description..."
        />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </form>

      {result?.cover_letter && (
        <div className="results-section">
          <div className="result-card">
            <h2>Generated Cover Letter</h2>

            <button className="copy-button" onClick={copyToClipboard}>
                Copy Cover Letter
            </button>

            <hr />

            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
              }}
            >
              {result.cover_letter.cover_letter}
            </pre>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <h3>Key Points Used</h3>

              <ul>
                {result.cover_letter.key_points_used?.map(
                  (point, index) => (
                    <li key={index}>{point}</li>
                  )
                )}
              </ul>
            </div>

            <div className="result-card">
              <h3>Suggestions</h3>

              <ul>
                {result.cover_letter.suggestions?.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}