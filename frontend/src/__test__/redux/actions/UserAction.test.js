import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../../../redux/actions/UserAction";
import axios from "axios";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
jest.mock("axios");

describe("UserAction component", () => {
  describe("register user actions", () => {
    it("creates when registerUser action is successful", async () => {
      const store = mockStore();
      const udata = {
        name: "tester",
        mybalance: "1200",
        email: "test@gmail.com",
        password: "test128",
      };

      axios.post.mockResolvedValue({ status: 200, data: { user: udata } });

      const expectedaction = [
        { type: "USER_REGISTER_REQUEST" },
        { type: "USER_REGISTER_SUCCESS", payload: udata },
      ];

      await store
        .dispatch(registerUser())
        .then(() => expect(store.getActions()).toEqual(expectedaction));
    });

    it("creates when register action is failed", async () => {
      const store = mockStore();
      const message = "User Already Register or Fields not Should be empty";

      axios.post.mockRejectedValue({
        status: 400,
        response: { data: { message } },
      });

      const expectedaction = [
        { type: "USER_REGISTER_REQUEST" },
        {
          type: "USER_REGISTER_FAILED",
          payload: message,
        },
      ];

      await store
        .dispatch(registerUser())
        .catch(() => expect(store.getActions()).toEqual(expectedaction));
    });
  });

  describe("login user actions", () => {
    it("creates when login action is successful", async () => {
      const store = mockStore();
      const udata = { email: "test@gmail.com", password: "test128" };

      axios.post.mockResolvedValue({ status: 200, data: { user: udata } });

      const expectedaction = [
        { type: "USER_LOGIN_REQUEST" },
        { type: "USER_LOGIN_SUCCESS", payload: udata },
      ];
      await store
        .dispatch(loginUser())
        .then(() => expect(store.getActions()).toEqual(expectedaction));
    });

    it("creates when login action is failed", async () => {
      const store = mockStore();
      const message = "Invalid Email or Password";
      axios.post.mockRejectedValue({
        status: 404,
        response: { data: { message } },
      });

      const expectedaction = [
        { type: "USER_LOGIN_REQUEST" },
        {
          type: "USER_LOGIN_FAILED",
          payload: message,
        },
      ];

      await store
        .dispatch(loginUser())
        .catch(() => expect(store.getActions()).toEqual(expectedaction));
    });
  });

  describe("logout user actions", () => {
    it("creates when logout action is successful", async () => {
      const store = mockStore();

      axios.post.mockResolvedValue({ status: 200 });

      const expectedaction = [{ type: "USER_LOGOUT" }];
      const actions = store.getActions();

      await store.dispatch(logoutUser());
      expect(actions).toEqual(expectedaction);
    });
  });
});
