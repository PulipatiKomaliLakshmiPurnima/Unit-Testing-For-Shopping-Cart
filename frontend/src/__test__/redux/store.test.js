import store from "../../redux/store";

describe("Test redux store", () => {
  it("Should return initial state correctly", () => {
    const initialStates = store.getState();
    const expectedState = {
      products: { products: [] },
      productDetails: {
        product: {},
      },
      loginUserReducer: {
        currentUser: localStorage.getItem("currentUser")
          ? JSON.parse(localStorage.getItem("currentUser"))
          : null,
      },
      registerUserReducer: {},
    };
    expect(initialStates).toEqual(expectedState);
  });
});
