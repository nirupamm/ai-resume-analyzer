import { useEffect, useState } from "react";
import { getStats } from "../api/resumeApi";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-container">Loading dashboard...</div>;
  }

  return (
    <div className="page-container">
      <h1>Dashboard</h1>
      <p className="subtitle">Overview of resume analysis performance.</p>

      <div className="score-grid">
        <div className="score-card">
          <h3>Total Analyses</h3>
          <p>{stats?.total_analyses ?? 0}</p>
        </div>

        <div className="score-card">
          <h3>Average Resume Score</h3>
          <p>{Math.round(stats?.average_resume_score ?? 0)}/100</p>
        </div>

        <div className="score-card">
          <h3>Average Job Match</h3>
          <p>{Math.round(stats?.average_job_match_score ?? 0)}/100</p>
        </div>

        <div className="score-card">
          <h3>Highest Resume Score</h3>
          <p>{stats?.highest_resume_score ?? 0}/100</p>
        </div>

        <div className="score-card">
          <h3>Lowest Resume Score</h3>
          <p>{stats?.lowest_resume_score ?? 0}/100</p>
        </div>
      </div>
    </div>
  );
}