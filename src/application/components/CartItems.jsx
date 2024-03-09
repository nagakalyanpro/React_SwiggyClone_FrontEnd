import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/api';
import { Link } from 'react-router-dom';

const CartItems = () => {
  const [cartData, setCartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartDetails = async () => {
      const firmId = localStorage.getItem('firmId');
      const userId = localStorage.getItem('userId');
      console.log("firm from cart", firmId);
      console.log("user from cart", userId);

      try {
        const response = await fetch(`${API_URL}/user/cartDetails/${firmId}/${userId}`);
        const data = await response.json();
        setCartData(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching cart details:', error);
        setLoading(false); 
      }
    };

    fetchCartDetails();
  }, []);

  return (
    <div className='cartSection'>
      <h2>Cart Details</h2>
      {loading ? (
        <p>Loading cart details...</p>
      ) : (
        cartData && cartData.items && cartData.items.length > 0 ? (
          <div className='cartItems'>
            {cartData.items.map((item) => (
              <div key={item._id} className='itemBox'>
               <ul>
               <p>Product: <strong className='itemName'>{item.product.name}</strong></p>
                <p>Amount: ₹ {item.product.price}</p>
               </ul>
                <div className='itemImg'>
              {item.product.image && <img src={`${API_URL}/uploads/${item.product.image}`} alt="" />}
                </div>
                
              </div>
            ))}
          </div>
        ) : (
          <>
          <p>Your cart is Empty.</p>
          <Link to='/'>
            <div>
            Add your favourite food
            </div>
          </Link>
          </>
        )
      )}
    </div>
  );
};

export default CartItems;
