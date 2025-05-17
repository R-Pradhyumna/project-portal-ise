import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img
        src="/assets/Event-logo.webp"
        alt="Event Logo"
        className="home-logo"
      />

      <div className="home-text">
        <h1>Welcome to the Department of IS&E</h1>
        <p>
          The Information Science & Engineering Department at MIT Mysore is
          dedicated to excellence in education, research, and innovation. Our
          department fosters a vibrant academic community, offering cutting-edge
          courses, industry collaborations, and a nurturing environment for
          students to thrive.
        </p>
        <p>
          Explore this portal to discover student projects, latest
          announcements, department guidelines, and prizes awarded for
          outstanding achievements.
        </p>
      </div>

      <button
        className="view-projects-btn"
        onClick={() => navigate("/project")}
      >
        View Projects
      </button>
    </div>
  );
}

export default Home;
