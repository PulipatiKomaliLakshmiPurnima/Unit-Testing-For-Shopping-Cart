import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import {
  addFavouriteItemsToCart,
  deleteFavouriteItemsToCart,
} from "../../../redux/actions/FavouriteAction";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock("axios");

describe("FavouriteAction component", () => {
  describe("addFavouriteItemsToCart user actions", () => {
    it("creates when addFavouriteItemsToCart action is sucess", async () => {
      const store = mockStore();
      const user = {
        name: "tester",
        email: "tester@gmail.com",
        mybalance: 1200,
        cart: [],
        favourite: [],
        _id: "1",
      };
      const product = {
        _id: "12",
        name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
        price: 54310,
        image:
          "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
      };
      localStorage.setItem("currentUser", JSON.stringify(user));
      let updateduser = { ...user, favourite: [product] };
      axios.put.mockResolvedValue({
        status: 200,
        data: updateduser,
      });
      const expectedaction = [
        {
          type: "USER_LOGIN_SUCCESS",
          payload: updateduser,
        },
      ];

      await store
        .dispatch(addFavouriteItemsToCart(product._id, product))
        .then(() => expect(store.getActions()).toEqual(expectedaction));
    });
    it("creates when addFavouriteItemsToCart action is failed", async () => {
      const store = mockStore();

      const error = jest.fn().mockRejectedValue(() => {
        return Promise.reject();
      });
      axios.put.mockRejectedValue({ status: 404, data: error });

      const expectedaction = [
        {
          type: "USER_LOGIN_FAILED",
          payload: error,
        },
      ];

      await store
        .dispatch(addFavouriteItemsToCart())
        .catch(() => expect(store.getActions()).toEqual(expectedaction));
    });
  });

  describe("deleteFavouriteItemsToCart user actions", () => {
    it("creates when deleteFavouriteItemsToCart action is sucess", async () => {
      const store = mockStore();
      const user = {
        name: "tester",
        email: "tester@gmail.com",
        mybalance: 1200,
        cart: [],
        favourite: [
          {
            _id: "12",
            name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
            price: 54310,
            image:
              "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
          },
          {
            _id: "634ffb15d9a0fcc3fedc8c37",
            name: "SWISSTONE Analogue Women's Watch (Blue Dial Silver Colored Strap)",
            image:
              "https://m.media-amazon.com/images/I/71qpD8bpwZL._UX342_.jpg",
            price: 450,
          },
        ],
        _id: "1",
      };
      const product = {
        _id: "12",
        name: "APPLE IPHONE 13 PRO MAX 128GB 5G MOBILE",
        price: 54310,
        image:
          "https://d12w9lfqeljony.cloudfront.net/7bcdf75ad237b8e02e301f4091fb6bc8/1000x1000/3f65abe9102bd1cae342990c63ed69b70b684c1c_63181385.jpg",
      };
      localStorage.setItem("currentUser", JSON.stringify(user));
      let updateduser = {
        ...user,
        favourite: user.favourite.filter((i) => i._id !== product._id),
      };
      axios.put.mockResolvedValue({
        status: 200,
        data: updateduser,
      });
      const expectedaction = [
        {
          type: "USER_LOGIN_SUCCESS",
          payload: updateduser,
        },
      ];

      await store
        .dispatch(deleteFavouriteItemsToCart(product._id, product, 1))
        .then(() => expect(store.getActions()).toEqual(expectedaction));
    });
    it("creates when deleteFavouriteItemsToCart action is failed", async () => {
      const store = mockStore();

      const error = jest.fn().mockRejectedValue(() => {
        return Promise.reject();
      });
      axios.put.mockRejectedValue({ status: 404, data: error });

      const expectedaction = [
        {
          type: "USER_LOGIN_FAILED",
          payload: error,
        },
      ];

      await store
        .dispatch(deleteFavouriteItemsToCart())
        .catch(() => expect(store.getActions()).toEqual(expectedaction));
    });
  });
});
