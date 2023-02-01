import "../css/Productdetail.css";
import { FcLike } from "react-icons/fc";
import { Container } from "react-bootstrap";
import Header from "../component/Header";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcHome, FcShipped, FcShop } from "react-icons/fc";
import { addItemsToCart } from "../redux/actions/CartAction";
import { getProductDetails } from "../redux/actions/ProductAction";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BsFillCheckCircleFill, BsZoomIn, BsZoomOut } from "react-icons/bs";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  addFavouriteItemsToCart,
  deleteFavouriteItemsToCart,
} from "../redux/actions/FavouriteAction";
import { useAlert } from "react-alert";

const Productdetail = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isReadMore, setIsReadMore] = useState(true);
  const { product } = useSelector((state) => state.productDetails);
  const { currentUser } = useSelector((state) => state.loginUserReducer);

  const increaseQuantity = () => {
    if (product?.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (product && id !== product._id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, product]);

  const addToCartHandler = (id, product) => {
    if (currentUser) {
      if (product.stock > 0) {
        dispatch(addItemsToCart(id, product, quantity));
      }
    } else {
      alert?.error("Please Login to access this resource");
    }
  };

  const addToFavouriteHandler = (id, product) => {
    if (currentUser) {
      dispatch(addFavouriteItemsToCart(id, product));
    } else {
      alert?.error("Please Login to access this resource");
    }
  };
  const deleteFavouriteItems = (id, product) => {
    dispatch(deleteFavouriteItemsToCart(id, product));
  };
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <Header />
      <Container>
        <div className="d-flex mt-3" data-testid="selected-product">
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
        <div className="productscreen row mt-3">
          <>
            <div className="productscreen__left col-lg-5">
              <TransformWrapper>
                {({ zoomIn, zoomOut, ...rest }) => (
                  <>
                    <TransformComponent>
                      <div
                        className="left__image px-5"
                        style={{
                          border: "2px solid lightgray",
                          borderRadius: "20px",
                        }}
                      >
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="image"
                          data-testid="product-image"
                        />
                      </div>
                    </TransformComponent>
                    <div className="tools d-flex pl-3 ">
                      <h5
                        onClick={() => zoomIn()}
                        data-testid="zoomin"
                        className="zoomin mt-2"
                      >
                        <BsZoomIn />
                      </h5>
                      <h5
                        onClick={() => zoomOut()}
                        data-testid="zoomout"
                        className="zoomout mt-2"
                      >
                        <BsZoomOut />
                      </h5>
                    </div>
                  </>
                )}
              </TransformWrapper>
            </div>
            <div className="productscreen__right col-lg-7 w-70%">
              <div className="right__info">
                <h4
                  className="left__name text-uppercase"
                  data-testid="product-name"
                >
                  {product?.name}
                </h4>
                <p
                  className="text-uppercase"
                  style={{ color: "blue" }}
                  data-testid="product-brand"
                >
                  {product?.brand}
                </p>
                &nbsp;
                <p data-testid="product-price">
                  Price: <b>{product?.price}&nbsp;Points</b>
                </p>
                <p>
                  <BsFillCheckCircleFill style={{ color: "green" }} />
                  &nbsp;Item price includes shipping and handling
                </p>
                <div className="row">
                  <div className="col-md-3 mt-2">
                    <div className="input-group">
                      <button
                        onClick={decreaseQuantity}
                        className="input-group-text"
                        data-testid="minus"
                      >
                        -
                      </button>
                      <input
                        readOnly
                        type="number"
                        value={quantity}
                        data-testid="count-value"
                        className="form-control text-center"
                      />
                      <button
                        onClick={increaseQuantity}
                        className="input-group-text"
                        data-testid="plus"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-6 mt-2">
                    {currentUser?.cart?.filter(
                      (item) => item?.name === product?.name
                    ).length > 0 ? (
                      <Link
                        to="/cart"
                        className="text-decoration-none"
                        data-testid="gotocartlink"
                      >
                        <button className="cart py-2 form-control">
                          <AiOutlineShoppingCart />
                          Go to Cart
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="cart py-2 form-control"
                        disabled={product?.stock <= 1 ? true : false}
                        onClick={() => addToCartHandler(product._id, product)}
                      >
                        <AiOutlineShoppingCart />
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <p>
                    Status:&nbsp;
                    <b
                      className={
                        product?.stock <= 1 ? "text-danger" : "text-success"
                      }
                    >
                      {product?.stock <= 1 ? "Out Of Stock" : "InStock"}
                    </b>
                  </p>
                </div>
                <div>
                  {currentUser?.favourite?.filter(
                    (item) => item?.name === product?.name
                  ).length > 0 ? (
                    <h6
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={deleteFavouriteItems}
                    >
                      <FcLike className="fs-3" />
                      &nbsp;Remove in Whishlist
                    </h6>
                  ) : (
                    <h6
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() =>
                        addToFavouriteHandler(product._id, product)
                      }
                    >
                      <AiOutlineHeart className="fs-3" />
                      &nbsp;Add to Whishlist
                    </h6>
                  )}
                </div>
                <hr />
                <div>
                  Total
                  <h5 className="price" data-testid="totalprice">
                    {product?.price * quantity}Points
                  </h5>
                </div>
                <hr />
                <h6>
                  <FcShipped className="fs-3" />
                  &nbsp;&nbsp;Usually ships within 7 business days.
                </h6>
                <div className="description card mb-5">
                  <h6>Product Description</h6>&nbsp;
                  <h5 className="text-uppercase">{product?.name}</h5>&nbsp;
                  <p
                    className={isReadMore ? "blockellipsis" : "null"}
                    data-testid="product-description"
                  >
                    {isReadMore ? product?.description : product?.description}
                  </p>
                  <div
                    onClick={toggleReadMore}
                    data-testid="togglereadmore"
                    className="text-info mb-3 seemore"
                  >
                    {isReadMore === true ? (
                      <h6 data-testid="seemore">
                        See More
                        <MdKeyboardArrowDown />
                      </h6>
                    ) : (
                      <h6 data-testid="seeless">
                        See Less
                        <MdKeyboardArrowUp />
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </Container>
    </>
  );
};

export default Productdetail;
