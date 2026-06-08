import { useState } from "react";
import { analyzeResume } from "../api/resumeApi";

export default function AnalyzeResume() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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

      const data = await analyzeResume(formData);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Analyze Resume</h1>

      <form onSubmit={handleAnalyze}>
        <div>
          <label>Resume (PDF/DOCX)</label>
          <br />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>

        <br />

        <div>
          <label>Job Description (Optional)</label>
          <br />
          <textarea
            rows="8"
            cols="70"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Analysis Result</h2>

          <pre
            style={{
              background: "#f4f4f4",
              padding: "1rem",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}