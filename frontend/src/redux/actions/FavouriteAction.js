import axios from "axios";

// Add to favourites
export const addFavouriteItemsToCart = (_id, product) => async (dispatch) => {
  // console.log(id, product);
  try {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const response = await axios.put(`/api/favourite/${user._id}`, {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
    });
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

// Delete from favourites
export const deleteFavouriteItemsToCart =
  (_id, product) => async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const response = await axios.put(`/api/favourite/delete/${user._id}`, {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
      });
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
