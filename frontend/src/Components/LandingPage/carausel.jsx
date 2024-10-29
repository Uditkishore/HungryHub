import Carousel from 'react-bootstrap/Carousel';

import styles from "./landingPage.module.css"

function CarouselComponent() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className={styles.carauselComponent}
                    src="/images/carausel_1.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={styles.carauselComponent}
                    src="/images/carausel_2.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={styles.carauselComponent}
                    src="/images/carausel_3.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent;
