import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page-container">
      <section className="overview-hero">
        <div>
          <p className="eyebrow">Local LLM powered career assistant</p>

          <h1>Build a stronger resume for every job application.</h1>

          <p className="hero-text">
            Analyze your resume, compare it with job descriptions, rewrite weak
            sections, and generate tailored cover letters from one clean dashboard.
          </p>

          <div className="hero-actions">
            <Link to="/analyze" className="primary-link">
              Analyze Resume
            </Link>

            <Link to="/rewrite" className="secondary-link">
              Rewrite Resume
            </Link>
          </div>
        </div>

        <div className="preview-card">
          <div className="preview-header">
            <span></span>
            Resume Health
          </div>

          <div className="preview-score">84%</div>

          <div className="preview-row">
            <span>ATS Score</span>
            <strong>Strong</strong>
          </div>

          <div className="preview-row">
            <span>Job Match</span>
            <strong>76%</strong>
          </div>

          <div className="preview-row">
            <span>Missing Skills</span>
            <strong>Docker, AWS</strong>
          </div>
        </div>
      </section>

      <section className="overview-grid">
        <div className="feature-card">
          <span className="feature-tag">01</span>
          <h3>ATS Analysis</h3>
          <p>Score resumes and identify formatting, keyword, and content gaps.</p>
        </div>

        <div className="feature-card">
          <span className="feature-tag">02</span>
          <h3>Job Matching</h3>
          <p>Compare resumes against job descriptions and reveal missing skills.</p>
        </div>

        <div className="feature-card">
          <span className="feature-tag">03</span>
          <h3>Resume Rewrite</h3>
          <p>Generate improved summaries, skills, and stronger experience bullets.</p>
        </div>

        <div className="feature-card">
          <span className="feature-tag">04</span>
          <h3>Cover Letters</h3>
          <p>Create tailored cover letters based on the resume and target role.</p>
        </div>
      </section>
    </div>
  );
}