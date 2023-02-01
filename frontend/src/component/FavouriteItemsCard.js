import React from "react";
import { Link } from "react-router-dom";

const FavouriteItemsCard = ({ item, deleteFavouriteItems }) => {
  return (
    <>
      <div className="FavouriteItemsCard">
        <div className="d-flex ">
          <img
            src={item.image}
            className="favouriteimage"
            data-testid="favouriteimage"
            alt="ssa"
          />
          <div className="ml-5">
            <Link
              to={`/product/${item._id}`}
              data-testid="itemlink"
              className="text-decoration-none text-uppercase text-black"
            >
              <h6 data-testid="favouritename">{item.name}</h6>
            </Link>
            <h6 data-testid="favouriteprice">
              Price:&nbsp;{`${item.price}`}&nbsp;Points
            </h6>
            <p
              data-testid="remove"
              onClick={() => deleteFavouriteItems(item._id, item)}
              style={{ color: "tomato" }}
            >
              Remove
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavouriteItemsCard;
