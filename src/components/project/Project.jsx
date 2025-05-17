import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./Project.css";

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

const RESOURCE_FIELDS = [
  "Innovata Certificates",
  "Innovata Papers",
  "Innovata Pictures",
  "Innovata PPTs",
  "Innovata Reports",
  "Innovata Videos",
];

const Project = () => {
  const [data, setData] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("21"); // default to 2021
  const [availableSchemes, setAvailableSchemes] = useState([]);

  useEffect(() => {
    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const rows = results.data.filter((r) => r["Scheme"]);
        setData(rows);

        const schemes = [...new Set(rows.map((r) => r["Scheme"]))].sort();
        setAvailableSchemes(schemes);
      },
    });
  }, []);

  const filteredTeams = data.filter(
    (team) => team["Scheme"] === selectedScheme
  );

  return (
    <div className="project-container">
      <div className="scheme-selector">
        <label>Choose a scheme:</label>
        <select
          value={selectedScheme}
          onChange={(e) => setSelectedScheme(e.target.value)}
        >
          {availableSchemes.map((scheme) => (
            <option key={scheme} value={scheme}>
              {scheme}
            </option>
          ))}
        </select>
      </div>

      <div className="project-container">
        {filteredTeams.map((team, idx) => (
          <div className="team-card" key={idx}>
            <h3>Team {team["Team No"]}</h3>
            <div className="resources">
              {RESOURCE_FIELDS.map((field) =>
                team[field] ? (
                  <a
                    key={field}
                    href={team[field]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-button"
                  >
                    {field
                      .replace("Innovata ", "")
                      .replace("PPTs", "Presentation")}
                  </a>
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
