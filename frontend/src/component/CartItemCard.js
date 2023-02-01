import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems, qtyChangeHandler }) => {
  return (
    <>
      <div className="CartItemCard d-flex">
        <img
          src={item?.image}
          alt="ssa"
          className="cartimage"
          data-testid="cartimage"
        />
        <div>
          <Link
            to={`/product/${item?._id}`}
            data-testid="itemlink"
            className="text-decoration-none text-black"
          >
            <h6 className="text-uppercase" data-testid="cartname">
              {item?.name}
            </h6>
          </Link>
          <p data-testid="cartprice">
            Price:&nbsp;{`${item?.price}`}&nbsp;Points
          </p>
          <div className="d-flex">
            <div className="d-flex me-3">
              <p className="my-1">Quantity</p>
              <p className="mx-2 my-1">:</p>
              <select
                value={item?.quantity}
                onChange={(e) =>
                  qtyChangeHandler(item?._id, item, e.target.value)
                }
                role="combobox"
                className="cartItem__select my-1"
              >
                {[...Array(item?.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            <p
              onClick={() => deleteCartItems(item?._id, item)}
              className="me-5 my-2 text-danger"
              style={{ cursor: "pointer" }}
            >
              Remove
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
