import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const EmptycartPage = () => {
    const { isLoading } = useSelector((store) => store.cartData);

    return (
        <div
            className="min-h-screen d-flex align-items-center justify-content-center"
            style={{ height: "100%" }}
        >
            {isLoading ? (
                <div
                    className=''
                    id="loader"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div style={{height : '600px'}} className="container mx-auto mt-8 p-5 rounded">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-lg">Your cart is empty.</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmptycartPage