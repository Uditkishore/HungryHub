import React, { useEffect, useState } from 'react'
import styles from "./landingPage.module.css"
import CarouselComponent from './carausel'
import axios from 'axios';
import { ProductCard } from '../Home/product';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loading from '../loading';

const LandingPage = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    const getTopProducts = async () => {
        try {
            let { data } = await axios(`${process.env.BASEURL}/product/top-products`);
            setTopProducts(data.data)
            setIsLoading(false)
        } catch (error) {
            console.log("topProductError", error.message)
        }
    }

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    }

    useEffect(() => {
        getTopProducts()
    }, [])

    if (isLoading) return <Loading />
    return (
        <div className={styles.main}>
            <CarouselComponent />
            <div className='d-flex flex-wrap justify-content-between py-2'>
                {topProducts.map((elem) => {
                    const stars = "★".repeat(elem.rating);
                    return (
                        <Card key={elem._id} className="card_style shadow btn" onClick={() => handleProductClick(elem._id)}>
                            <Card.Img
                                variant="top"
                                src={`${process.env.BASEURL}/${elem.image}`}
                                style={{ height: "20rem", width: "280px" }}
                                className="mt-3 object-contain"
                            />
                            <Card.Body>
                                <Card.Title className='text-start'>{elem.name}</Card.Title>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Text
                                        className="font-weight-bold mb-0"
                                        style={{
                                            flexGrow: 1,
                                            textAlign: "left",
                                            padding: "0 10px" // Optional, adjust as needed
                                        }}
                                    >
                                        Price: <b>₹ {elem.price}</b>
                                    </Card.Text>
                                    <Card.Text
                                        className="text-center"
                                        style={{
                                            backgroundColor: "green",
                                            color: "white",
                                            padding: "2px 10px", // Adjust padding for better alignment
                                            borderRadius: "4px",
                                            fontSize: "0.9rem", // Optional font adjustment
                                            whiteSpace: "nowrap", // Prevents text from wrapping
                                        }}
                                    >
                                        {stars}
                                    </Card.Text>
                                </div>

                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
            <div className='text-end mx-3'>
                <Link to={"/product"} className={styles.link}>View more...</Link>
            </div>
        </div>
    )
}

export default LandingPage