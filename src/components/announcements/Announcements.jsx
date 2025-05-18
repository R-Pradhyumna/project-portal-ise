import useDriveData from "../../hooks/useDriveData";
import "./Announcements.css";

function Announcements() {
  const csvUrl = import.meta.env.VITE_SHEET_URL;
  const data = useDriveData(csvUrl);

  // Filter out only rows that have a valid Announcements link
  const announcementLinks = data
    .map((row) => row.Announcements)
    .filter((link) => link && link.trim().length > 0);

  return (
    <div className="announcements-page">
      <h1 className={announcementLinks.length === 0 ? "no-data" : "page-title"}>
        {announcementLinks.length === 0
          ? "No announcements yet."
          : "📢 Announcements"}
      </h1>

      {announcementLinks.map((link, index) => (
        <div key={index} className="announcement-card">
          <h3 className="announcement-title">Announcement {index + 1}</h3>
          <iframe
            src={link}
            width="100%"
            height="400"
            title={`announcement-${index}`}
            allow="autoplay"
          ></iframe>
        </div>
      ))}
    </div>
  );
}

export default Announcements;
