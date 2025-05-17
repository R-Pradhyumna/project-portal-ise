// import { useEffect, useState } from "react";
// import Papa from "papaparse";
// import "./Guidelines.css";

// const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

// const Guidelines = () => {
//   const [phaseLinks, setPhaseLinks] = useState({});
//   const [selectedPhase, setSelectedPhase] = useState(null);

//   useEffect(() => {
//     Papa.parse(SHEET_URL, {
//       download: true,
//       header: true,
//       complete: (results) => {
//         const data = results.data;
//         const row = data.find((r) => r["Phase-1"] || r["Phase-2"]);
//         if (!row) return;

//         const links = {
//           "Phase-1": row["Phase-1"]
//             ? row["Phase-1"]
//                 .split(",")
//                 .map((url) => url.trim())
//                 .filter((url) => url.startsWith("http"))
//             : [],
//           "Phase-2": row["Phase-2"]
//             ? row["Phase-2"]
//                 .split(",")
//                 .map((url) => url.trim())
//                 .filter((url) => url.startsWith("http"))
//             : [],
//         };

//         setPhaseLinks(links);
//       },
//     });
//   }, []);

//   return (
//     <div className="guidelines-container">
//       <h2>Innovata Guidelines</h2>

//       <div className="phase-cards">
//         {["Phase-1", "Phase-2"].map((phase) => (
//           <div
//             key={phase}
//             className={`phase-card ${selectedPhase === phase ? "active" : ""}`}
//             onClick={() => setSelectedPhase(phase)}
//           >
//             {phase}
//           </div>
//         ))}
//       </div>

//       {selectedPhase && (
//         <>
//           <h3 className="selected-label">Showing: {selectedPhase}</h3>
//           {phaseLinks[selectedPhase]?.length > 0 ? (
//             <div className="link-list">
//               {phaseLinks[selectedPhase].map((link, idx) => (
//                 <a
//                   key={idx}
//                   href={link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="guideline-link"
//                 >
//                   📄 Link {idx + 1}
//                 </a>
//               ))}
//             </div>
//           ) : (
//             <p className="no-links">No links available for {selectedPhase}.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Guidelines;

import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./Guidelines.css";

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

const Guidelines = () => {
  const [data, setData] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("");

  useEffect(() => {
    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const cleanedData = results.data.filter(
          (r) => r.Scheme && r.Phase && r.Links
        );
        setData(cleanedData);
      },
    });
  }, []);

  const schemes = [...new Set(data.map((row) => row.Scheme))];

  const filteredLinks = data.find(
    (row) => row.Scheme === selectedScheme && row.Phase === selectedPhase
  );

  const links = filteredLinks?.Links
    ? filteredLinks.Links.split(",").map((l) => l.trim())
    : [];

  return (
    <div className="guidelines-container">
      <h2>Innovata Guidelines</h2>

      <div className="dropdowns">
        <select
          value={selectedScheme}
          onChange={(e) => {
            setSelectedScheme(e.target.value);
            setSelectedPhase(""); // Reset phase when scheme changes
          }}
        >
          <option value="">-- Select Scheme --</option>
          {schemes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {selectedScheme && (
          <div className="phase-cards">
            {["Phase-1", "Phase-2"].map((phase) => (
              <div
                key={phase}
                className={`phase-card ${
                  selectedPhase === phase ? "active" : ""
                }`}
                onClick={() => setSelectedPhase(phase)}
              >
                {phase}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPhase && (
        <>
          <h3 className="selected-label">
            Showing: {selectedPhase} ({selectedScheme})
          </h3>
          {links.length > 0 ? (
            <div className="link-list">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guideline-link"
                >
                  📄 Link {idx + 1}
                </a>
              ))}
            </div>
          ) : (
            <p className="no-links">
              No links available for {selectedPhase} of {selectedScheme}.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Guidelines;
