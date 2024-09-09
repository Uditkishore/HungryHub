import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Example product data
const products = [
    { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Product 5', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Product 6', image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Product 7', image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Product 8', image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Product 9', image: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Product 8', image: 'https://via.placeholder.com/150' },
    { id: 11, name: 'Product 8', image: 'https://via.placeholder.com/150' },
    { id: 12, name: 'Product 9', image: 'https://via.placeholder.com/150' },
];

function CarouselComponent() {
    // Split products into chunks of 6
    const chunkSize = 6;
    const productChunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
        productChunks.push(products.slice(i, i + chunkSize));
    }

    return (
        <Carousel interval={null}>
            {productChunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                    <Row className='m-3'>
                        {chunk.map(product => (
                            <Col key={product.id} sm={4} md={2}>
                                <Card>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselComponent;
