import { useEffect, useState } from "react";
import { getAnalyses, getAnalysisById } from "../api/resumeApi";

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

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

  const viewDetails = async (id) => {
  try {
    const data = await getAnalysisById(id);
    setSelectedAnalysis(data);
  } catch (error) {
    console.error(error);
    alert("Failed to load analysis details.");
  }
};

  if (loading) {
    return <div className="page-container">Loading history...</div>;
  }
  const DetailList = ({ title, items }) => (
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
                <tr key={item.id} onClick={() => viewDetails(item.id)} style={{ cursor: "pointer" }}>
                  <td>{item.filename}</td>
                  <td>{item.resume_score ?? "N/A"}</td>
                  <td>{item.job_match_score ?? "N/A"}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedAnalysis && (
  <div className="result-card">
    <h2>Analysis Details</h2>

    <p><strong>Filename:</strong> {selectedAnalysis.filename}</p>
    <p><strong>Resume Score:</strong> {selectedAnalysis.resume_score ?? "N/A"}</p>
    <p><strong>Job Match Score:</strong> {selectedAnalysis.job_match_score ?? "N/A"}</p>

    <h3>Full AI Analysis</h3>

    <div className="history-detail-grid">
  <div className="result-card">
    <h3>Summary</h3>
    <p>{selectedAnalysis.analysis?.summary || "No summary available."}</p>
  </div>

  <div className="result-card">
    <h3>Improved Summary</h3>
    <p>
      {selectedAnalysis.analysis?.improved_summary ||
        "No improved summary available."}
    </p>
  </div>

  <DetailList title="Matched Skills" items={selectedAnalysis.analysis?.matched_skills} />
  <DetailList title="Missing Skills" items={selectedAnalysis.analysis?.missing_skills} />
  <DetailList title="Strengths" items={selectedAnalysis.analysis?.strengths} />
  <DetailList title="Weaknesses" items={selectedAnalysis.analysis?.weaknesses} />
  <DetailList title="ATS Tips" items={selectedAnalysis.analysis?.ats_tips} />
  <DetailList
    title="Job Recommendations"
    items={selectedAnalysis.analysis?.job_specific_recommendations}
  />
</div>
  </div>
)}
        </div>
      )}
    </div>
  );
}