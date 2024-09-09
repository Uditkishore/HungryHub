import React from 'react'
import styles from "./landingPage.module.css"
import CarouselComponent from './carausel'
import ProductSlider from './productSlider'

const LandingPage = () => {
    return (
        <div className={styles.main}>
            <CarouselComponent />
            <div className='productCarausel'>
                <ProductSlider />
            </div>
        </div>
    )
}

export default LandingPage