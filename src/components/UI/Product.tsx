import ProductTitleCard from "./ProductTitleCard";
import Graph from "../Visualization/Graph";
import Table from "../Tables/Table";
import { useSelector } from "react-redux";
import { selectCurrProduct } from "../../store/store";

import { formatJSDate } from "../../utility/MonthFormatter";
import { IProduct } from "../../models/IProduct";

import "./Product.scss";

const Product = (props: { image: string }) => {
  const product: IProduct = useSelector(selectCurrProduct);
  const sales = product.sales;

  return (
    <div className="product-details-container">
      <div className="product-details">
        {Object.keys(product).length > 0 && (
          <ProductTitleCard
            image={product.image}
            title={product.title}
            subtitle={product.subtitle}
            tags={product.tags}
            id={product.id}
          />
        )}

        <div className="product-sale-container">
          <Graph
            title="Retail Sales"
            XAxisFormatter={(tick) => formatJSDate(tick)}
            sales = {sales}
          />
          <Table data={sales} />
        </div>
      </div>
    </div>
  );
};

export default Product;
