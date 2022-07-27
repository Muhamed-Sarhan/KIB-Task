import React from "react";
import { useCSVDownloader } from "react-papaparse";

const ProductBrandTable = ({ DataObj, Orders, toggler }) => {
  const { CSVDownloader, Type } = useCSVDownloader();
  const orderData = Object.values(DataObj).map((x) => x?.map((v) => v.item));
  const item = orderData.map((x) => [...new Set(x)]);
  const brands = Orders?.map((x) => x?.map((w) => w?.brand));

  const mostFrequent = (arr) =>
    Object.entries(
      arr.reduce((a, v) => {
        a[v] = a[v] ? a[v] + 1 : 1;
        return a;
      }, {})
    ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];
  const mostBrand = brands?.map((x, ind) => {
    return {
      item: item[ind][0],
      brand: mostFrequent(x),
    };
  });
  console.log(mostBrand, "mino");

  return (
    <>
      {toggler ? (
        <div className="table-container">
          <div className="btns-container-tables">
            <h3>0_order_log00</h3>
            <div className="downloader">
              <CSVDownloader
                type={Type.Button}
                filename={"filename"}
                bom={true}
                data={mostBrand}
              >
                Export to CSV
              </CSVDownloader>
            </div>
          </div>
          <table>
            <tr>
              <th>Item</th>
              <th>Most Popular Brand</th>
            </tr>
            {mostBrand?.map((x) => (
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

export default ProductBrandTable;
