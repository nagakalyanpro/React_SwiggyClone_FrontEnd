import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/api';
import { Link } from 'react-router-dom';

const AllFirms = () => {
  const [firmData, setFirmData] = useState([]);
  const [filteredFirms, setFilteredFirms] = useState([]);

  const handleFirmClick = (firmId) => {
    localStorage.setItem('firmId', firmId);
  };

  const firmDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/firm/all-firms`);
      const data = await response.json();
      if (data && Array.isArray(data.firms)) {
        setFirmData(data.firms);
        setFilteredFirms(data.firms); // Set initial filtered firms
      } else {
        console.error('Invalid data structure:', data);
        alert('Error in fetching data');
      }
    } catch (error) {
      console.log(error);
      alert('Error in fetching data');
    }
  };

  // const filterByCategory = (category) => {
  //   if (category === 'all') {
  //     setFilteredFirms(firmData);
  //   } else {
  //     const filtered = firmData.filter((firm) => firm.category.includes(category));
  //     setFilteredFirms(filtered);
  //   }
  // };

  const filterByCategory = (category) => {
  if (category === 'all') {
    setFilteredFirms(firmData);
  } else {
    const filtered = firmData.filter((firm) => firm.category.includes(category) && firm.category.length === 1);
    setFilteredFirms(filtered);
  }
};


  const filterByRegion = (region) => {
    if (region === 'all') {
      setFilteredFirms(firmData);
    } else {
      const filtered = firmData.filter((firm) => firm.region.includes(region));
      setFilteredFirms(filtered);
    }
  };

  useEffect(() => {
    firmDetails();
  }, []);

  return (
  <>
    <section className='firmSection'>
  <h2>Choose your favourite Dish</h2>
    <div className="filterButtons">
        <button onClick={() => filterByCategory('all')}>All</button>
        <button onClick={() => filterByCategory('veg')}>Veg</button>
        {/* <button onClick={() => filterByCategory('non-veg')}>Non-Veg</button> */}
        <button onClick={() => filterByRegion('all')}>All Regions</button>
        <button onClick={() => filterByRegion('south-indian')}>South Indian</button>
        <button onClick={() => filterByRegion('north-indian')}>North Indian</button>
        <button onClick={() => filterByRegion('chinese')}>Chinese</button>
        <button onClick={() => filterByRegion('bakery')}>Bakery</button>
      </div>
    <br />
      <div className="firmGallery">
        {filteredFirms.map((item) => (
          <Link
          to={`/products/${item._id}/${encodeURIComponent(item.firmName)}`}
            key={item._id}
            className='link'
            onClick={() => handleFirmClick(item._id)}
          >
         <div className="zoomEffect">
         <div className='firmImgBox'>
              {item.image && <img src={`${API_URL}/uploads/${item.image}`} alt="" />}
              <div className='firmOffer'> {item.offer}</div>
            </div>
            <div className="firmName">
              <strong>
                {item.firmName},
              </strong>
              {item.region.join(', ')}
            </div>
            <div className="firmArea"> {item.area}</div>
            <div className="firmCategory">{item.category.join(', ')}</div>
         </div>
          </Link>
        ))}
      </div>
    </section>
  </>
  );
};

export default AllFirms;
