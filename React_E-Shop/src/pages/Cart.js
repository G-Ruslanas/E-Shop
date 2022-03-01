import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import "./css/Cart.css";
import styled from "styled-components";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  margin: 0px 10px;
`;

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const user_id = 1;
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cart/find/${user_id}`
        );
        setProducts(res.data.products);
        setTotal(res.data.total);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleToken = async (token) => {
    const response = await axios.post(
      "http://localhost:5000/api/stripe/checkout",
      {
        products,
        total,
        token,
      }
    );
    const { status } = response.data;
    if (status === "success") {
      console.log("Success! Check emails for details");
    } else {
      console.log("Something went wrong!");
    }

    const user_id = 1;
    const deleteCart = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/cart/find/${user_id}`);
      } catch (error) {
        console.log(error);
      }
    };
    deleteCart();
    window.location.reload(false);
  };

  const handleClick = () => {
    const user_id = 1;
    const deleteCart = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/cart/find/${user_id}`);
      } catch (error) {
        console.log(error);
      }
    };
    deleteCart();
    window.location.reload(false);
  };

  return (
    <div className="cart">
      <Announcement />
      <Navbar />
      <div className="cart_wrapper">
        <h1 className="cart_title">YOUR BAG</h1>
        <div className="cart_containter">
          <div className="cart_info">
            {products.map((product) => {
              return product.products.map((prod, index) => {
                return (
                  <div className="cart_product" key={index}>
                    <div className="cart_product_info">
                      <img
                        src={prod.img}
                        alt={prod.id}
                        className="cart_product_image"
                      />
                      <div className="cart_product_details">
                        <span className="cart_product_name">
                          <b>Product:</b> {prod.title}
                        </span>
                        <span className="cart_product_id">
                          <b>ID:</b> {prod._id}
                        </span>
                        <FilterColor color={prod.color} key={prod.color} />
                        <span className="cart_product_size">
                          <b>SIZE:</b>
                          {prod.size}
                        </span>
                      </div>
                    </div>
                    <div className="cart_product_price_info">
                      <div className="cart_product_amountcont">
                        <span className="cart_product_amount">
                          {prod.quantity}
                        </span>
                      </div>
                      <span className="cart_product_price">
                        $ {prod.price * prod.quantity}
                      </span>
                    </div>
                  </div>
                );
              });
            })}
          </div>
          <div className="product_summary">
            <h1 className="summary_title">ORDER SUMMARY</h1>
            <div className="summary_item">
              <span className="summary_item_text">Estimated Shipping</span>
              <span className="summary_item_price">$ 5.0</span>
            </div>
            <div className="summary_item">
              <span className="summary_item_text">Shipping Discount</span>
              <span className="summary_item_price">$ -5.0</span>
            </div>
            <div className="summary_item">
              <span className="summary_item_text">
                <b>Total</b>
              </span>
              <span className="summary_item_price">$ {total}</span>
            </div>
            <StripeCheckout
              stripeKey="pk_test_51K1VS2IjqPb8FkRvICnfh27rAzMswXf2jGP2zBOUHW87sNfGMyI0fA8D0YFaclvMTLJcAFLjQij5hIbbHxw00aL800JJTQbv7B"
              token={handleToken}
              billingAddress
              shippingAddress
              amount={total * 100}
              name="products"
              className="summary_button"
            />
            <button className="summary_button" onClick={handleClick}>
              Remove everything
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
