import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/api';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FirmMenu = () => {
    const [firmProducts, setFirmProducts] = useState([]);
    const { firmId, firmName } = useParams();
    const userId = localStorage.getItem('userId');
    const [message, setMessage] = useState(false)

    const notify=()=> toast("Please Login to add item to cart");
    
   
    const productsHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/products/${firmId}/products`);
            if (!response.ok) {
                console.error(`Failed to fetch firm products. Status: ${response.status}`);
                alert('Failed to fetch products');
                return;
            }
            const productData = await response.json();
            setFirmProducts(productData);
            console.log(productData);
        } catch (error) {
            console.error('Failed to fetch firm products:', error);
            alert('Failed to fetch products');
        }
    };

    useEffect(() => {
        console.log("Firm ID:", firmId);
        productsHandler();
    }, [firmId]);


    const handleAddButtonClick = async (productId) => {
  
        try {
            const response = await fetch(`${API_URL}/cart/${firmId}/${userId}/add-to-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: 1, // You may adjust the quantity as needed
                }),
            });
            if(!userId){
                // alert('Please Login to add item to cart');
                notify();
            }
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

    
            const responseData = await response.json();
            console.log(responseData.message); // Product added to cart successfully
                alert('Product added successfully!')
            // Perform additional actions as needed
    
        } catch (error) {
            console.error('Error adding product to cart:', error.message);
            // Handle error accordingly
        }
    };
    

    return (
        <div className='firmProductSection'>
            <h2>{firmName}</h2>
            <ToastContainer 
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            {firmProducts.map((product) => (
                <div key={product._id} className='productBox'>
                    <div className="menuBox">
                    <div className='proName'>{product.name}</div>
                    <div> ₹ {product.price}</div>
                   
                    <p>Description: {product.description}</p>
                    </div>
                    <div className="productImage">
                    {product.image && <img src={`${API_URL}/uploads/${product.image}`} alt={product.name} />}
                    <button className='addBtn' onClick={() => handleAddButtonClick(product._id)}>ADD</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FirmMenu;
