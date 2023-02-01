import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import {
  addItemsToCart,
  quantityChange,
  removeItemsFromCart,
} from "../../../redux/actions/CartAction";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock("axios");

describe("CartAction component", () => {
  describe("addItemsToCart user actions", () => {
    it("creates when addItemsToCart action is sucess", async () => {
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
        _id: "634ffb15d9a0fcc3fedc8c37",
        name: "SWISSTONE Analogue Women's Watch (Blue Dial Silver Colored Strap)",
        image: "https://m.media-amazon.com/images/I/71qpD8bpwZL._UX342_.jpg",
        price: 450,
        stock: 40,
        quantity: 1,
        totalPrice: 450,
      };
      localStorage.setItem("currentUser", JSON.stringify(user));
      let updateduser = { ...user, cart: [product] };
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
        .dispatch(addItemsToCart(product._id, product, 1))
        .then(() => expect(store.getActions()).toEqual(expectedaction));
    });
    it("creates when addItemsToCart action is failed", async () => {
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
        .dispatch(addItemsToCart())
        .catch(() => expect(store.getActions()).toEqual(expectedaction));
    });
  });
  describe("quantityChange user actions", () => {
    it("creates when quantityChange action is sucess", async () => {
      const store = mockStore();
      const user = {
        name: "tester",
        email: "tester@gmail.com",
        mybalance: 1200,
        cart: [
          {
            _id: "634ffb15d9a0fcc3fedc8c37",
            name: "SWISSTONE Analogue Women's Watch (Blue Dial Silver Colored Strap)",
            image:
              "https://m.media-amazon.com/images/I/71qpD8bpwZL._UX342_.jpg",
            price: 450,
            stock: 40,
            quantity: 1,
            totalPrice: 450,
          },
          {
            _id: "634505f35496c895386cea8c",
            name: "Cannon EOS-1D",
            image:
              "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            price: 1300,
            stock: 10,
            quantity: 1,
            totalPrice: 1300,
          },
        ],
        favourite: [],
        _id: "1",
      };

      const qproduct = {
        _id: "634ffb15d9a0fcc3fedc8c37",
        quantity: 3,
        totalPrice: 1350,
      };
      localStorage.setItem("currentUser", JSON.stringify(user));
      let updateduser = {
        ...user,
        cart: user.cart.map((i) =>
          i._id === qproduct._id ? { ...i, ...qproduct } : i
        ),
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
        .dispatch(quantityChange(qproduct._id, qproduct, 3))
        .then(() => expect(store.getActions()).toEqual(expectedaction));
    });
    it("creates when quantityChange action is failed", async () => {
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
        .dispatch(quantityChange())
        .catch(() => expect(store.getActions()).toEqual(expectedaction));
    });
  });
  describe("removeItemsFromCart user actions", () => {
    it("creates when removeItemsFromCart action is sucess", async () => {
      const store = mockStore();
      const user = {
        name: "tester",
        email: "tester@gmail.com",
        mybalance: 1200,
        cart: [
          {
            _id: "634ffb15d9a0fcc3fedc8c37",
            name: "SWISSTONE Analogue Women's Watch (Blue Dial Silver Colored Strap)",
            image:
              "https://m.media-amazon.com/images/I/71qpD8bpwZL._UX342_.jpg",
            price: 450,
            stock: 40,
            quantity: 1,
            totalPrice: 450,
          },
          {
            _id: "634505f35496c895386cea8c",
            name: "Cannon EOS-1D",
            image:
              "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            price: 1300,
            stock: 10,
            quantity: 1,
            totalPrice: 1300,
          },
        ],
        favourite: [],
        _id: "1",
      };
      const product = {
        _id: "634ffb15d9a0fcc3fedc8c37",
        name: "SWISSTONE Analogue Women's Watch (Blue Dial Silver Colored Strap)",
        image: "https://m.media-amazon.com/images/I/71qpD8bpwZL._UX342_.jpg",
        price: 450,
        stock: 40,
        quantity: 1,
        totalPrice: 450,
      };
      localStorage.setItem("currentUser", JSON.stringify(user));
      let updateduser = {
        ...user,
        cart: user.cart.filter((i) => i._id !== product._id),
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
        .dispatch(removeItemsFromCart(product._id, product, 1))
        .then(() => expect(store.getActions()).toEqual(expectedaction));
    });
    it("creates when removeItemsFromCart action is failed", async () => {
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
        .dispatch(removeItemsFromCart())
        .catch(() => expect(store.getActions()).toEqual(expectedaction));
    });
  });
});
