import React, { useEffect, useState } from 'react';
import styles from './landingPage.module.css';
import CarouselComponent from './carausel';
import axios from 'axios';
import { ProductCard } from '../Home/product';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loading from '../loading';

const carauselOne = ["/images/carausel_1.jpg", "/images/carausel_2.jpg", "/images/carausel_3.jpg"];

const LandingPage = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getTopProducts = async () => {
        try {
            const { data } = await axios(`${process.env.BASEURL}/product/top-products`);
            setTopProducts(data.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Top Product Error:", error.message);
        }
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    useEffect(() => {
        getTopProducts();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className={styles.main}>
            <CarouselComponent />
            <h2 className={styles.sectionTitle}>Top Rated Dishes</h2>
            <div className={styles.productGrid}>
                {topProducts.map((product) => {
                    const stars = "★".repeat(product.rating);
                    const title = product.name.length > 20 ? product.name.slice(0, 20) + "..." : product.name;

                    return (
                        <Card
                            key={product._id}
                            className={`${styles.card} shadow-sm`}
                            onClick={() => handleProductClick(product._id)}
                        >
                            <Card.Img
                                variant="top"
                                src={product.image}
                                className={styles.cardImage}
                            />
                            <Card.Body>
                                <Card.Title className={styles.cardTitle}>{title}</Card.Title>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <Card.Text className={styles.cardPrice}>
                                        ₹ <b>{product.price}</b>
                                    </Card.Text>
                                    <Card.Text className={styles.ratingBadge}>
                                        {stars}
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;
