import { Card } from "react-bootstrap";
import { BtnCustom } from "../button";

export const ProductCard = ({ product, onClick }) => {
  const stars = "★".repeat(product.rating);

  return (
    <div className="col mb-4">
      <Card className="card_style px-1 shadow" onClick={onClick}>
        <Card.Img
          variant="top"
          src={product.image}
          style={{ height: "15rem" }}
          className="mt-3 object-contain"
        />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text className="font-weight-bold">
                Price: ₹ {product.price}
              </Card.Text>
            </div>
            <small
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "2px",
              }}
            >
              {stars}
            </small>
          </div>
          <Card.Text>{product.category}</Card.Text>
          <div className="row w-100">
            <BtnCustom className={"col btn btn-outline-dark"} name={'Add to Cart'} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
