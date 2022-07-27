import React, { useState } from "react";
import { Button, Divider, Pagination, Table } from "rsuite";
import { useCSVDownloader } from "react-papaparse";
import ProductAvgTable from "./productAvgTable";
import ProductBrandTable from "./productPopular";

const DataTable = ({ rowData, columnData }) => {
  const { CSVDownloader, Type } = useCSVDownloader();
  const [loading /*setLoading*/] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [avgToggle, setAvgToggle] = useState(false);
  const [brandToggle, setBrandToggle] = useState(false);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  const groupBy = (array, property) => {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
      if (!hash[array[i][property]]) hash[array[i][property]] = [];
      hash[array[i][property]].push(array[i]);
    }
    return hash;
  };
  const OrdersData = rowData?.map((x) => x.item);
  let Items = [...new Set(OrdersData)];
  const Orders = Items?.map((x) => groupBy(rowData, "item")[x]);
  const DataObj = groupBy(rowData, "item");

  const data = rowData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const handleAvgToggler = () => {
    setAvgToggle(!avgToggle);
    console.log(avgToggle);
  };
  const handleBrandToggler = () => {
    setBrandToggle(!brandToggle);
  };
  const handleBothToggler = () => {
    setAvgToggle(true);
    setBrandToggle(true);
  };
  const handleHideBothToggler = () => {
    setAvgToggle(false);
    setBrandToggle(false);
  };
  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="general-table">
        <div className="btns-container-tables">
          <h3 style={{ marginBottom: "2rem" }}>order_log00</h3>
          <div className="downloader">
            <CSVDownloader
              type={Type.Button}
              filename={"filename"}
              bom={true}
              data={rowData}
            >
              Export to CSV
            </CSVDownloader>
          </div>
        </div>
        <Table
          height={270}
          data={data}
          loading={loading}
          onRowClick={(data) => {
            console.log(data);
          }}
        >
          {columnData?.map((x, index) => (
            <Table.Column width={200} key={index}>
              <Table.HeaderCell align="center">{x?.Header}</Table.HeaderCell>
              <Table.Cell dataKey={x?.accessor} align="center" />
            </Table.Column>
          ))}
        </Table>

        <div style={{ padding: 20 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            total={rowData.length}
            limitOptions={[10, 20]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </div>
      <div className="btns-container">
        <Button onClick={handleBrandToggler} color="green" appearance="primary">
          {brandToggle ? "Hide" : "Show"} 0_order_log00
        </Button>

        <Button onClick={handleAvgToggler} color="orange" appearance="primary">
          {avgToggle ? "Hide" : "Show"} 1_order_log00
        </Button>
        {avgToggle && brandToggle ? (
          <Button
            onClick={handleHideBothToggler}
            color="violet"
            appearance="primary"
          >
            Hide Both Tables
          </Button>
        ) : (
          <Button
            onClick={handleBothToggler}
            color="violet"
            appearance="primary"
          >
            Show Both Tables
          </Button>
        )}
      </div>
      <Divider />

      <ProductBrandTable
        DataObj={DataObj}
        Orders={Orders}
        toggler={brandToggle}
      />
      <Divider />
      <ProductAvgTable
        DataObj={DataObj}
        rowData={rowData}
        toggler={avgToggle}
      />
    </div>
  );
};

export default DataTable;
