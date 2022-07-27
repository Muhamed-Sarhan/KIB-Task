import React, { useState } from "react";
import "./App.css";
import { useCSVReader } from "react-papaparse";
import { Button } from "rsuite";
import DataTable from "./components/dataTable";
import Footer from "./components/footer";
import NavbarComp from "./components/navbar";

function App() {
  const { CSVReader } = useCSVReader();
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState(null);

  const handleLoadData = (results) => {
    const columns = results.data[0].map((col, index) => {
      return {
        Header: col,
        accessor: col.split(" ").join("_").toLowerCase(),
      };
    });
    const rows = results.data.slice(1).map((row) => {
      return row.reduce((acc, curr, index) => {
        acc[columns[index].accessor] = curr;
        return acc;
      }, {});
    });
    setColumnData(columns);
    setRowData(rows);
  };

  return (
    <>
      <div className="App">
        <NavbarComp />
      </div>
      <div className="upload-container">
        <CSVReader onUploadAccepted={handleLoadData}>
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
          }) => (
            <>
              <div className="upload-wrapper">
                <Button
                  color="cyan"
                  appearance="primary"
                  type="button"
                  {...getRootProps()}
                >
                  CSV Upload
                </Button>
                {acceptedFile && (
                  <>
                    <div className="file_progress">
                      <div>{acceptedFile.name}</div>
                      <div style={{ marginTop: "0.5rem" }}>
                        <ProgressBar />
                      </div>
                    </div>
                    <Button
                      color="red"
                      appearance="primary"
                      {...getRemoveFileProps()}
                    >
                      Remove
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </CSVReader>
      </div>
      {rowData && columnData && (
        <>
          <DataTable rowData={rowData} columnData={columnData} />
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
