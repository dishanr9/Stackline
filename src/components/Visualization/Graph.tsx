import { useSelector } from "react-redux";
import { selectCurrProduct } from "../../store/store";

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { IProduct } from "../../models/IProduct";
import { ISale } from "../../models/ISale";

import "./Graph.scss";

const Graph = (props: {
  sales: ISale[];
  title: string;
  XAxisFormatter?: (tick: string) => string | void;
}): JSX.Element => {
  const product: IProduct = useSelector(selectCurrProduct);
  const sales = product.sales;
  const tableData = sales;

  // Achieve different scaling for the 2 keys
  const retailDomain = [
    0 - Math.min(...tableData.map((o) => o.retailSales)) * 320,
    Math.max(...tableData.map((o) => o.retailSales)) * 2,
  ];

  const wholesaleDomain = [
    0 - Math.min(...tableData.map((o) => o.wholesaleSales)) * 10,
    Math.max(...tableData.map((o) => o.wholesaleSales)) * 3,
  ];
  return (
    <div className="product-sales-graph card">
      <header className="graph-title">{props.title}</header>
      {props.sales && (
        <ResponsiveContainer width="99%" height="100" aspect={3}>
          <LineChart
            width={0}
            height={0}
            data={tableData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="weekEnding"
              axisLine={true}
              type="category"
              allowDuplicatedCategory={false}
              dy={10}
              tickLine={false}
              tickFormatter={(tick) =>
                props.XAxisFormatter ? props.XAxisFormatter(tick) : tick
              }
              stroke="#c2c9d7"
            />
            <YAxis
              type="number"
              domain={retailDomain}
              axisLine={false}
              hide={true}
              allowDataOverflow={true}
              yAxisId="retail"
            />
            <YAxis
              type="number"
              domain={wholesaleDomain}
              axisLine={false}
              hide={true}
              allowDataOverflow={true}
              yAxisId="wholesale"
            />
            <Line
              type="basisOpen"
              dataKey="retailSales"
              stroke="#43A6F6"
              strokeWidth={4}
              dot={false}
              yAxisId="retail"
            />
            <Line
              type="basisOpen"
              dataKey="wholesaleSales"
              stroke="#9BA6BF"
              strokeWidth={4}
              dot={false}
              yAxisId="wholesale"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Graph;
