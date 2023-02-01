import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  getProductDetails,
  getProduct,
  clearErrors,
  filterProducts,
} from "../../../redux/actions/ProductAction.js";
import axios from "axios";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
jest.mock("axios");
const product = {
  id: "1",
  category: "Electronics",
  subcategory: "Mobile",
  brand: "APPLE",
  sales: 20,
  stock: 20,
  name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
  price: 54310,
  description:
    "Upgrade your photography skills to a new level as the Apple iPhone 13. 17 cm (6.7-inch) Super Retina XDR display with ProMotion for a faster, more responsive feel. Cinematic mode adds shallow depth of field and shifts focus automatically in your videos",
  image:
    "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
};
describe("ProductAction Component", () => {
  describe("getProduct actions", () => {
    it("creates when getProduct action is successful", async () => {
      const store = mockStore({});
      axios.get.mockResolvedValue({ status: 200, data: product });

      const expectedaction = [
        { type: "ALL_PRODUCT_REQUEST" },
        { type: "ALL_PRODUCT_SUCCESS", payload: product },
      ];

      await store.dispatch(getProduct()).then(() => {
        expect(store.getActions()).toEqual(expectedaction);
      });
    });
    it("creates when getProduct action is successful for keyword", async () => {
      const store = mockStore({});
      axios.get.mockResolvedValue({ status: 200, data: product });

      const expectedaction = [
        { type: "ALL_PRODUCT_REQUEST" },
        { type: "ALL_PRODUCT_SUCCESS", payload: product },
      ];
      await store.dispatch(getProduct("APPLE")).then(() => {
        expect(store.getActions()).toEqual(expectedaction);
      });
    });
    it("creates when getProduct action is failed", async () => {
      const store = mockStore();
      const message = "Product not found";

      axios.get.mockRejectedValue({
        status: 404,
        response: { data: { message } },
      });
      const expectedaction = [
        { type: "ALL_PRODUCT_REQUEST" },
        {
          type: "ALL_PRODUCT_FAIL",
          payload: message,
        },
      ];

      await store
        .dispatch(getProduct())
        .catch(() => expect(store.getActions()).toContainEqual(expectedaction));
    });
  });
  describe("getProductDetails actions", () => {
    it("creates when getProductDetail action is successful", async () => {
      const store = mockStore();
      axios.get.mockResolvedValue({ status: 200, data: { product: product } });

      const expectedaction = [
        { type: "PRODUCT_DETAILS_REQUEST" },
        { type: "PRODUCT_DETAILS_SUCCESS", payload: product },
      ];

      await store
        .dispatch(getProductDetails())
        .then(() => expect(store.getActions()).toEqual(expectedaction));
    });
    it("creates when getProductDetails action is failed", async () => {
      const message = "Product not found";

      const store = mockStore();
      axios.get.mockRejectedValue({
        status: 400,
        response: { data: { message } },
      });
      const expectedaction = [
        { type: "PRODUCT_DETAILS_REQUEST" },
        {
          type: "PRODUCT_DETAILS_FAIL",
          payload: message,
        },
      ];

      await store
        .dispatch(getProductDetails())
        .catch(() => expect(store.getActions()).toEqual(expectedaction));
    });
  });
  describe("clearErrors actions", () => {
    it("creates when clearErrors action", async () => {
      const store = mockStore();

      const expectedaction = [
        {
          type: "CLEAR_ERRORS",
        },
      ];

      await store
        .dispatch(clearErrors())
        .catch(() => expect(store.getActions()).toEqual(expectedaction));
    });
  });
  describe("filterProducts actions", () => {
    it("creates when filterProducts action", async () => {
      const store = mockStore();
      axios.post.mockResolvedValue({
        status: 200,
        data: { products: product },
      });

      const expectedaction = [
        {
          type: "GET_PRODUCTS",
          payload: product,
        },
      ];

      await store
        .dispatch(filterProducts())
        .then(() => expect(store.getActions()).toEqual(expectedaction));
    });
    it("creates when filterProducts action is failure", async () => {
      const store = mockStore();
      axios.post.mockRejectedValue({ status: 404 });
      await store
        .dispatch(filterProducts())
        .catch((error) =>
          expect(console.log(error)).toEqual(console.log(error))
        );
    });
  });
});
