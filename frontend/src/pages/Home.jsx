import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div>
          <p className="badge">AI-Powered Career Assistant</p>

          <h1>Analyze, Improve, and Tailor Your Resume with AI</h1>

          <p className="hero-text">
            Upload your resume, get ATS feedback, match it with job descriptions,
            rewrite weak sections, and generate tailored cover letters using local LLMs.
          </p>

          <div className="hero-actions">
            <Link to="/analyze" className="primary-link">
              Analyze Resume
            </Link>

            <Link to="/cover-letter" className="secondary-link">
              Generate Cover Letter
            </Link>
          </div>
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <h3>ATS Resume Analysis</h3>
          <p>
            Get resume scores, strengths, weaknesses, missing skills, and practical ATS tips.
          </p>
        </div>

        <div className="feature-card">
          <h3>Job Description Matching</h3>
          <p>
            Compare your resume with a job description and identify skill gaps.
          </p>
        </div>

        <div className="feature-card">
          <h3>AI Resume Rewrite</h3>
          <p>
            Generate improved summaries, skills sections, and experience bullet points.
          </p>
        </div>

        <div className="feature-card">
          <h3>Cover Letter Generator</h3>
          <p>
            Create tailored cover letters based on your resume and target job.
          </p>
        </div>
      </section>
    </div>
  );
}