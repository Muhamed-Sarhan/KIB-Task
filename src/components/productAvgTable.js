import React from "react";
import { useCSVDownloader } from "react-papaparse";

const ProductAvgTable = ({ DataObj, toggler, rowData }) => {
  const { CSVDownloader, Type } = useCSVDownloader();
  const quantity = Object.values(DataObj).map((x) =>
    x?.map((v) => Number(v.quantity))
  );
  const orderData = Object.values(DataObj).map((x) => x?.map((v) => v.item));
  const item = orderData.map((x) => [...new Set(x)]);

  const arrSum = quantity.map((x) => x.reduce((a, b) => a + b));
  const Avg = arrSum?.map((x) => x / rowData?.length);

  const finalAvg = Avg?.map((x, ind) => {
    return {
      item: item[ind][0],
      brand: x,
    };
  });
  console.log(finalAvg, "mino");

  return (
    <>
      {toggler ? (
        <div className="table-container">
          <div className="btns-container-tables">
            <h3>1_order_log00</h3>
            <div className="downloader">
              <CSVDownloader
                type={Type.Button}
                filename={"filename"}
                bom={true}
                data={finalAvg}
              >
                Export to CSV
              </CSVDownloader>
            </div>
          </div>
          <table>
            <tr>
              <th>Item</th>
              <th>Average per Order</th>
            </tr>
            {finalAvg?.map((x) => (
              <tr>
                <td>{x.item}</td>
                <td>{x.brand}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : null}
    </>
  );
};

export default ProductAvgTable;
