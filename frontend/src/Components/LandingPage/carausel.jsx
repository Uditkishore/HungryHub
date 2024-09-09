import Carousel from 'react-bootstrap/Carousel';

import styles from "./landingPage.module.css"

function CarouselComponent() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className={styles.carauselComponent}
                    src="https://www.shutterstock.com/image-photo/supermarket-shopping-cart-full-groceries-260nw-2244240221.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={styles.carauselComponent}
                    src="https://i0.wp.com/goniyo.com/wp-content/uploads/2024/05/supermarkets.webp?fit=1500%2C500&ssl=1"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={styles.carauselComponent}
                    src="https://themeforest.img.customer.envatousercontent.com/files/484116221/04_Home+Page+Variation.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=300&s=7c23e1427de429bdd0cf0ac0cc26c793"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent;
