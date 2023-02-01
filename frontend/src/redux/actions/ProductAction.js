import axios from "axios";

export const getProduct =
  (keyword = "", price) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "ALL_PRODUCT_REQUEST",
      });
      let link = `/api/products`;
      if (keyword) {
        link = `/api/products?keyword=${keyword}`;
      } else if (price) {
        link = `/api/products?price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      const { data } = await axios.get(link);
      dispatch({
        type: "ALL_PRODUCT_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ALL_PRODUCT_FAIL",
        payload: error.response.data?.message,
      });
    }
  };

// Get All Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: "PRODUCT_DETAILS_SUCCESS",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload: error.response.data?.message,
    });
  }
};

//   Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_ERRORS",
  });
};

export const filterProducts = (filter) => async (dispatch) => {
  try {
    const response = await axios.post("/api/filter", filter);
    const { data } = response;
    // console.log(response);
    dispatch({
      type: "GET_PRODUCTS",
      payload: data.products,
    });
  } catch (error) {
    console.log(error);
  }
};
