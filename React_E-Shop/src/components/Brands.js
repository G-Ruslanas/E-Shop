import React, { useEffect, useState } from "react";
// import { brandsItems } from "../data";
import "./css/Brands.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Brands = () => {
  const [brand, setBrands] = useState([]);
  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/brands");
        setBrands(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBrands();
  }, []);

  return (
    <div id="ID_BRANDS">
      <h1 className="brands_h1">POPULAR BRANDS</h1>
      <div className="brands">
        {brand.map((brand) => {
          return (
            <div className="brands_wrapper" key={brand._id}>
              <img className="brands_image" src={brand.img} alt={brand._id} />
              <div className="brands_info">
                <h1 className="brands_title">{brand.brand}</h1>
                <Link to={`/products/${brand.brand}`}>
                  <button type="button" className="brands_button">
                    LEARN MORE
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Brands;
