import React, { useState } from "react";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

const PDFSave = () => {
  const [print, setPrint] = useState(false);
  return (
    <div>
      <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFSave;
