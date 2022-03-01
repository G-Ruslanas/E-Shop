import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import "./css/Slider.css";
import { sliderItems } from "../data";
import { Link } from "react-router-dom";
import axios from "axios";

const Slider = () => {
  const [current, setCurrent] = useState(1);
  const length = sliderItems.length;
  const nextSlide = () => {
    setCurrent(current === length ? 1 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 1 ? length : current - 1);
  };

  const [slides, setSlides] = useState([]);
  useEffect(() => {
    const getSlides = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/slides");
        setSlides(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSlides();
  }, []);

  return (
    <div className="slider">
      <div className="left_arrow" onClick={prevSlide}>
        <ArrowLeftOutlined />
      </div>
      <div className="slider_wrapper">
        {slides.map((slide) => {
          if (slide.id === current) {
            return (
              <div className="slider_slide" key={slide.id}>
                <div className="slider_imageCont">
                  <img
                    className="slider_image"
                    src={slide.img}
                    alt={slide.id}
                  />
                </div>
                <div className="slider_info">
                  <h1 className="slider_title">{slide.title}</h1> <br />
                  <p className="slider_desc">{slide.desc}</p> <br />
                  <Link to={`/products/sales/${slide.tag}`}>
                    <button type="button" className="slider_button">
                      SHOP NOW
                    </button>
                  </Link>
                </div>
              </div>
            );
          }
          return false;
        })}
      </div>
      <div className="right_arrow" onClick={nextSlide}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
