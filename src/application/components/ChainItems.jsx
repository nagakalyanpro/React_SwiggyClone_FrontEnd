import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/api";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { MagnifyingGlass } from 'react-loader-spinner'
import { Link } from "react-router-dom";

const ChainItems = () => {
  const [firmData, setFirmData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  const firmDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/firm/all-firms`);
      const data = await response.json();
      if (data && Array.isArray(data.firms)) {
        setFirmData(data.firms);
        setLoading(false)
      } else {
        console.error("Invalid data structure:", data);
       setLoading(true)
      }
    } catch (error) {
      console.log(error);
      setLoading(true)
    }
  };

  useEffect(() => {
    firmDetails();
  }, []);
 

  const handleScroll = (direction) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 300;

    if (direction === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
  <>
  {loading && <div className="loader">
    Your 🥣 is Loading...
    <br />
  <MagnifyingGlass 
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
  </div> }
    <section className="chainSection">
      <div className="chainBox">
        <h2>Top restaurant chains in Hyderabad</h2>
        <div className="scrollButtons">
          <button
            onClick={() => handleScroll("left")}
            disabled={scrollPosition === 0}
            className="iconBtn"
          >
            <FaArrowLeft />
          </button>
          <button onClick={() => handleScroll("right")}
          className="iconBtn"
          >
          <FaArrowRight />
          </button>
        </div>
        <div
          id="chainGallery"
          className="chainGallery"
          onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
        >
          {firmData.map((item) => (
                        <Link
                        to={`/products/${item._id}/${encodeURIComponent(item.firmName)}`}
                        key={item._id}
                        className='link'
                        onClick={() => handleFirmClick(item._id)}
                      >
            <>
              <div key={item._id} className="chainImgBox zoomEffect">
                {item.image && (
                  <img src={`${API_URL}/uploads/${item.image}`} alt="" />
                )}
                <div className="chainOffer"> {item.offer}</div>
              </div>
            </>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};

export default ChainItems;
