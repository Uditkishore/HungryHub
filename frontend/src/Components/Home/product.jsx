import { Card } from "react-bootstrap";

export const ProductCard = ({ product, onClick }) => {
  const stars = "★".repeat(product.rating);

  return (
    <div className="col mb-4">
      <Card className="card_style shadow" onClick={onClick}>
        <Card.Img
          variant="top"
          src={product.image}
          style={{ height: "16rem" }}
          className="mt-3 object-cover"
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
        </Card.Body>
      </Card>
    </div>
  );
};
