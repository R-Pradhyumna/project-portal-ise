import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./Guidelines.css";

const sheetUrl = import.meta.env.VITE_SHEET_URL;

function Guidelines() {
  const [phaseLinks, setPhaseLinks] = useState({}); // Store links by phase
  const [selectedPhase, setSelectedPhase] = useState(null); // Selected phase
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state if data fails

  useEffect(() => {
    // Fetch data only on mount
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(sheetUrl);
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            // Find the first row with phase-1 or phase-2
            const row = results.data.find((r) => r["Phase-1"] || r["Phase-2"]);
            if (!row) {
              setError("No data found for Phase-1 or Phase-2.");
              setLoading(false);
              return;
            }

            // Split and filter the links
            const links = {
              "Phase-1": row["Phase-1"]
                ? row["Phase-1"]
                    .split(/\n/)
                    .map((url) => url.trim())
                    .filter((url) => url.startsWith("http"))
                : [],
              "Phase-2": row["Phase-2"]
                ? row["Phase-2"]
                    .split(/\n/)
                    .map((url) => url.trim())
                    .filter((url) => url.startsWith("http"))
                : [],
            };

            setPhaseLinks(links);
            setLoading(false); // Stop loading once data is loaded
          },
        });
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData(); // Trigger the fetch on component mount
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="guidelines-container">
      <h2>Innovata Guidelines</h2>

      {/* Show loading spinner only when data is being fetched */}
      {loading && <div className="loading-spinner"></div>}

      {/* Show error message if an error occurs */}
      {error && !loading && <p className="error-message">{error}</p>}

      {/* Render phase cards only after loading is done */}
      {!loading && !error && (
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

      {/* Show selected phase and links */}
      {selectedPhase && (
        <>
          <h3 className="selected-label">Showing: {selectedPhase}</h3>
          {phaseLinks[selectedPhase]?.length > 0 ? (
            <div className="link-list">
              {phaseLinks[selectedPhase].map((link, idx) => (
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
            <p className="no-links">No links available for {selectedPhase}.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Guidelines;

// import { useEffect, useState } from "react";
// import Papa from "papaparse";
// import "./Guidelines.css";

// const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

// const Guidelines = () => {
//   const [data, setData] = useState([]);
//   const [selectedScheme, setSelectedScheme] = useState("");
//   const [selectedPhase, setSelectedPhase] = useState("");

//   useEffect(() => {
//     Papa.parse(SHEET_URL, {
//       download: true,
//       header: true,
//       complete: (results) => {
//         const cleanedData = results.data.filter(
//           (r) => r.Scheme && r.Phase && r.Links
//         );
//         setData(cleanedData);
//       },
//     });
//   }, []);

//   const schemes = [...new Set(data.map((row) => row.Scheme))];

//   const filteredLinks = data.find(
//     (row) => row.Scheme === selectedScheme && row.Phase === selectedPhase
//   );

//   const links = filteredLinks?.Links
//     ? filteredLinks.Links.split(",").map((l) => l.trim())
//     : [];

//   return (
//     <div className="guidelines-container">
//       <h2>Innovata Guidelines</h2>

//       <div className="dropdowns">
//         <select
//           value={selectedScheme}
//           onChange={(e) => {
//             setSelectedScheme(e.target.value);
//             setSelectedPhase(""); // Reset phase when scheme changes
//           }}
//         >
//           <option value="">-- Select Scheme --</option>
//           {schemes.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>

//         {selectedScheme && (
//           <div className="phase-cards">
//             {["Phase-1", "Phase-2"].map((phase) => (
//               <div
//                 key={phase}
//                 className={`phase-card ${
//                   selectedPhase === phase ? "active" : ""
//                 }`}
//                 onClick={() => setSelectedPhase(phase)}
//               >
//                 {phase}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {selectedPhase && (
//         <>
//           <h3 className="selected-label">
//             Showing: {selectedPhase} ({selectedScheme})
//           </h3>
//           {links.length > 0 ? (
//             <div className="link-list">
//               {links.map((link, idx) => (
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
//             <p className="no-links">
//               No links available for {selectedPhase} of {selectedScheme}.
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Guidelines;
