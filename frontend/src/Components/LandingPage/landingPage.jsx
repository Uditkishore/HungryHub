import React, { useEffect, useState } from 'react'
import styles from "./landingPage.module.css"
import CarouselComponent from './carausel'
import axios from 'axios';
import { ProductCard } from '../Home/product';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [topProducts, setTopProducts] = useState([]);

    const getTopProducts = async () => {
        try {
            let { data } = await axios(`${process.env.BASEURL}/product/top-products`);
            setTopProducts(data.data)
        } catch (error) {
            console.log("topProductError", error.message)
        }
    }

    useEffect(() => {
        getTopProducts()
    }, [])

    return (
        <div className={styles.main}>
            <CarouselComponent />
            <div className='d-flex justify-content-between p-2'>
                {topProducts.map((elem) => {
                    return (
                        <div >
                            <ProductCard
                                key={elem._id}
                                product={elem}
                                onClick={() => handleProductClick(elem._id)}
                            />
                        </div>
                    )
                })}
            </div>
            <Link to={"/product"} className='text-end'>view more...</Link>
        </div>
    )
}

export default LandingPage