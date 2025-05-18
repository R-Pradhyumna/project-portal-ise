import { useState, useEffect } from "react";
import Papa from "papaparse";

const useDriveData = (csvUrl) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
      error: (err) => {
        console.error("CSV Fetch Error:", err);
      },
    });
  }, [csvUrl]);

  return data;
};

export default useDriveData;
