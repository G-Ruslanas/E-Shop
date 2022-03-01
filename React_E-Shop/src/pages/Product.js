import React, { useEffect, useState, useReducer } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./css/Product.css";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  margin: 0px 10px;
`;
const initialState = {
  products: [],
  total: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const newProducts = [...state.products, action.payload];
      return {
        ...state,
        products: newProducts,
        total: state.total + action.payload.price * action.payload.quantity,
      };
    default:
      throw new Error("no matching action type");
  }
};

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/find/${productId}`
        );
        const clicks = { clicks: res.data.clicks + 1 };
        const response = await axios.put(
          `http://localhost:5000/api/products/find/${productId}`,
          clicks
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [productId]);

  const handleQuantity = (t) => {
    if (t === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const setCart = async () => {
      const user_id = 1;
      try {
        const cart = await axios.get(
          `http://localhost:5000/api/cart/find/${user_id}`
        );
        if (cart.data === null) {
          await axios.post("http://localhost:5000/api/cart");
        } else if (state.products.length !== 0) {
          await axios.put(
            `http://localhost:5000/api/cart/find/${user_id}`,
            state
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    setCart();
  }, [state]);

  const handleClick = () => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: { ...product, color, size, quantity },
    });
  };

  return (
    <div class="product">
      <Announcement />
      <Navbar />
      <div className="product_wrapper">
        <div className="product_imagecont">
          <img
            src={product.img}
            alt={product.title}
            className="product_image"
          ></img>
        </div>
        <div className="product_info">
          <h1 className="product_title">{product.title}</h1>
          <p className="product_desc">{product.desc}</p>
          <span className="product_price">$ {product.price}</span>
          <div className="product_filter_cont">
            <div className="product_filter">
              <div className="product_filter_title">Color</div>
              {product.colors?.map((color) => {
                return (
                  <FilterColor
                    color={color}
                    key={color}
                    onClick={() => {
                      setColor(color);
                    }}
                  />
                );
              })}
            </div>
            <div className="product_filter">
              <div className="product_filter_title">Size</div>
              <select
                name="size"
                id="size"
                className="product_filter_size"
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="default" selected disabled>
                  Select Size
                </option>
                {product.size?.map((size) => {
                  return (
                    <option
                      value={size}
                      key={size}
                      className="product_filter_size_option"
                    >
                      {size}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="product_countcont">
            <div className="product_amount">
              <Remove onClick={() => handleQuantity("dec")} />
              <div className="product_number">{quantity}</div>
              <Add onClick={() => handleQuantity("inc")} />
            </div>
            <button
              type="button"
              className="product_button"
              onClick={handleClick}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
