import { useEffect, useState } from "react";
import { getAnalyses } from "../api/resumeApi";

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyses();
  }, []);

  const loadAnalyses = async () => {
    try {
      const data = await getAnalyses();
      setAnalyses(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load analysis history.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-container">Loading history...</div>;
  }

  return (
    <div className="page-container">
      <h1>Analysis History</h1>
      <p className="subtitle">Previously analyzed resumes.</p>

      {analyses.length === 0 ? (
        <div className="result-card">
          <p>No analysis history found.</p>
        </div>
      ) : (
        <div className="result-card">
          <table className="history-table">
            <thead>
              <tr>
                <th>Filename</th>
                <th>Resume Score</th>
                <th>Job Match</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {analyses.map((item) => (
                <tr key={item.id}>
                  <td>{item.filename}</td>
                  <td>{item.resume_score ?? "N/A"}</td>
                  <td>{item.job_match_score ?? "N/A"}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}