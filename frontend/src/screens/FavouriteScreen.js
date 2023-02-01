import "../css/Favourite.css";
import React from "react";
import Header from "../component/Header";
import { Container } from "react-bootstrap";
import { IoMdHeartDislike } from "react-icons/io";
import { FcHome, FcShop } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavouriteItemsCard from "../component/FavouriteItemsCard";
import { deleteFavouriteItemsToCart } from "../redux/actions/FavouriteAction";

const Favourite = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loginUserReducer);

  const deleteFavouriteItems = (id, product) => {
    dispatch(deleteFavouriteItemsToCart(id, product));
  };

  return (
    <>
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

        {currentUser && currentUser.favourite.length === 0 ? (
          <div className="emptyCart">
            <h1>
              <IoMdHeartDislike style={{ color: "tomato" }} />
            </h1>
            <h5>No Items In Favourites</h5>
            <Link to="/" data-testid="viewlink">
              View All Products
            </Link>
          </div>
        ) : (
          <>
            {currentUser ? (
              <>
                <h4>My Favourites Items</h4>
                <hr />
                <div className="favouritesPage mb-3">
                  {currentUser &&
                    currentUser.favourite.map((item, index) => (
                      <div key={index}>
                        <div className="row mb-5">
                          <div
                            className="col-md-8"
                            style={{ cursor: "pointer" }}
                          >
                            <FavouriteItemsCard
                              item={item}
                              deleteFavouriteItems={deleteFavouriteItems}
                            />
                          </div>
                          <div className="col-md-4">
                            <Link
                              to={`/product/${item._id}`}
                              className="text-decoration-none text-black"
                              data-testid="viewproduct"
                            >
                              <button
                                className="btn btn-outline-success mt-3"
                                data-testid="view"
                              >
                                View Product
                              </button>
                            </Link>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <h4 style={{ textAlign: "center", marginTop: "50px" }}>
                Please Login to access this resource &nbsp;
                <a href="/login">click here</a>
              </h4>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Favourite;
