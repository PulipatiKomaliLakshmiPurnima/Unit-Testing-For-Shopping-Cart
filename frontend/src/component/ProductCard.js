import "../css/ProductCard.css";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import {
  addFavouriteItemsToCart,
  deleteFavouriteItemsToCart,
} from "../redux/actions/FavouriteAction";
import { FcLike } from "react-icons/fc";
import { useAlert } from "react-alert";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { currentUser } = useSelector((state) => state.loginUserReducer);

  const addToFavouriteHandler = () => {
    if (currentUser) {
      dispatch(addFavouriteItemsToCart(product._id, product));
    } else {
      alert.error("Please Login to access this resource");
    }
  };

  const deleteFavouriteItems = (id, product) => {
    dispatch(deleteFavouriteItemsToCart(id, product));
  };

  return (
    <div className="carddata">
      <Card className="mb-5">
        <div style={{ cursor: "pointer" }}>
          {currentUser?.favourite?.find((item) => item._id === product?._id) ? (
            <h6
              className="data"
              data-testid="deletefavourite"
              style={{ cursor: "pointer" }}
              onClick={() => deleteFavouriteItems(product._id, product)}
            >
              <FcLike />
            </h6>
          ) : (
            <h6
              className="data"
              data-testid="addtofavourite"
              onClick={addToFavouriteHandler}
              style={{ cursor: "pointer" }}
            >
              <AiOutlineHeart />
            </h6>
          )}
        </div>

        <Link
          to={`/product/${product?._id}`}
          data-testid="productlink"
          className="text-decoration-none text-black"
        >
          <Card.Img
            variant="top"
            data-testid="productimage"
            className="image"
            src={product?.image}
            alt={product?.name}
          />
        </Link>
        <Card.Body>
          <Card.Text data-testid="product-brand">{product?.brand}</Card.Text>
          <Card.Title
            className="mb-3"
            data-testid="product-name"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.name}
          </Card.Title>
          <Card.Text style={{ color: "blue" }} data-testid="product-price">
            {product?.price} <b>Points</b>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
