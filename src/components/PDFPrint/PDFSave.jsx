import React, { useState } from "react";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

// &#10; 回车换行  &#32; space 
// &#13; — 回车Carriage Return 
const PDFSave = ({subtitle,content}) => {
  const [print, setPrint] = useState(false);
  return (
    <div>
      <PDFDownloadLink
        document={
          <MyDocument subtitle={subtitle} content={content} />
        }
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFSave;
