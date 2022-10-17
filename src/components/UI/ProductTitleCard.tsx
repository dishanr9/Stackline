import { Card } from "./Card";

import "./ProductTitleCard.scss";

const ProductTitleCard = (props: {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  tags: string[];
}): JSX.Element => {
  return (
    <div className="product-title-card product-title card">
      <img src={props.image} alt="" />
      <div className="product-name"> {props.title}</div>
      <div className="product-description">{props.subtitle}</div>
      <div className="product-tags-container">
        {props.tags.map((tag, index) => (
          <Card key={index} text={tag} />
        ))}
      </div>
    </div>
  );
};

export default ProductTitleCard;
