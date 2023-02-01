import "../css/Cart.css";
import React, { Fragment } from "react";
import Header from "../component/Header";
import CartItemCard from "../component/CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FcHome, FcShop } from "react-icons/fc";
import { Container, Button } from "react-bootstrap";
import {
  quantityChange,
  removeItemsFromCart,
} from "../redux/actions/CartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loginUserReducer);

  const qtyChangeHandler = (id, product, quantity) => {
    dispatch(quantityChange(id, product, quantity));
  };

  const deleteCartItems = (id, product) => {
    dispatch(removeItemsFromCart(id, product));
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <div className="d-flex mt-3">
          <Link
            to={`/`}
            className="text-decoration-none text-black"
            data-testid="link-to-home"
          >
            <h6>
              <FcHome className="fs-4" />
              Home
            </h6>
            &nbsp;
          </Link>
          <h6>|</h6>&nbsp;
          <Link
            to={`/cart`}
            className="text-decoration-none text-black"
            data-testid="link-to-shoppingcart"
          >
            <h6>
              <FcShop className="fs-4" />
              Shopping Cart
            </h6>
          </Link>
        </div>

        {currentUser && currentUser.cart.length === 0 ? (
          <div className="emptyCart">
            <h1>
              <MdRemoveShoppingCart style={{ color: "tomato" }} />
            </h1>

            <h6>No Product in Your Cart</h6>
            <Link to="/">View Products</Link>
          </div>
        ) : (
          <>
            {currentUser ? (
              <Fragment>
                <h3>My Shopping Cart</h3>
                <hr />
                <div className="cartPage">
                  {currentUser &&
                    currentUser.cart.map((item, index) => (
                      <div key={index}>
                        <div className="cartContainer row mb-5">
                          <div className="col-lg-8 col-md-9">
                            <CartItemCard
                              item={item}
                              qtyChangeHandler={qtyChangeHandler}
                              deleteCartItems={deleteCartItems}
                            />
                          </div>
                          <div className="center col-lg-4 col-md-3 mt-5">
                            <h5
                              className="cartSubtotal"
                              data-testid="tproductprice"
                            >
                              {`${item.price * item.quantity}`}Points
                            </h5>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}

                  <div className="cartGrossProfit row mb-5">
                    <div className="col-lg-7 col-md-8"></div>
                    <div className="col-lg-5 col-md-4">
                      <div className="cartGrossProfitBox  d-flex">
                        <div className="d-flex mx-3">
                          <h6 className="mr-5">Total&nbsp;:</h6>
                        </div>
                        <h5 data-testid="tcartprice">
                          {`${currentUser?.cart?.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )}`}
                          Points
                        </h5>
                      </div>
                      <p className="text-info">
                        Item Price includes Shipping and Handling
                      </p>
                      <div className="d-flex mb-5">
                        <Link
                          to="/"
                          className="text-decoration-none"
                          data-testid="shoppinglink"
                        >
                          <p className="me-3">Continue Shopping</p>
                        </Link>
                        <Button variant="primary" className="button">
                          Secure Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <h4 style={{ textAlign: "center", marginTop: "50px" }}>
                Please Login to access this resource&nbsp;
                <a href="/login">click here</a>
              </h4>
            )}
          </>
        )}
      </Container>
    </Fragment>
  );
};

export default Cart;
