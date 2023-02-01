import axios from "axios";

// Add to Cart
export const addItemsToCart = (_id, product, quantity) => async (dispatch) => {
  // console.log(_id, product);
  try {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    const response = await axios.put(`/api/cart/${user._id}`, {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
      quantity,
      totalPrice: product.price * quantity,
    });
    // console.log(response);
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: response.data,
    });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload: error,
    });
  }
};

export const quantityChange = (_id, product, quantity) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    const response = await axios.put(`/api/cart/quantity/${user._id}`, {
      _id: product._id,
      quantity,
      totalPrice: product.price * quantity,
    });
    // console.log(response)
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: response.data,
    });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload: error,
    });
  }
};

// REMOVE FROM CART
export const removeItemsFromCart = (id, product) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    // console.log(user);
    const response = await axios.put(`/api/cart/delete/${user._id}`, product);
    // console.log(response);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload: error,
    });
  }
};
