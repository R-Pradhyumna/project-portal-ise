import useDriveData from "../../hooks/useDriveData";
import "./Prizes.css";

function Prizes() {
  const csvUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
  const data = useDriveData(csvUrl);

  // Extract non-empty Prize links
  const prizeLinks = data
    .map((row) => row.Prizes)
    .filter((link) => link && link.trim().length > 0);

  return (
    <div className="prizes-page">
      <h1 className={prizeLinks.length === 0 ? "no-data" : "page-title"}>
        {prizeLinks.length === 0
          ? "No prizes uploaded yet."
          : "🏆 Prize Winners"}
      </h1>

      {prizeLinks.map((link, index) => (
        <div key={index} className="prize-card">
          <h3 className="prize-title">Prize Set {index + 1}</h3>
          <iframe
            src={link}
            width="100%"
            height="400"
            title={`prize-${index}`}
            allow="autoplay"
          ></iframe>
        </div>
      ))}
    </div>
  );
}

export default Prizes;
