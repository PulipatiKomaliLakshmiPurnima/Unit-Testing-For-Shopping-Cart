import {
  loginUserReducer,
  registerUserReducer,
} from "../../../redux/reducers/UserReducer";

describe("UserReducer", () => {
  describe("loginUserReducer", () => {
    const initialState = {};
    it("should return the empty state", () => {
      expect(loginUserReducer(undefined, {})).toEqual(initialState);
    });
    it("should handle USER_LOGIN_REQUEST", () => {
      expect(
        loginUserReducer(undefined, {
          type: "USER_LOGIN_REQUEST",
        })
      ).toEqual({ loading: true });
    });
    it("should handle USER_LOGIN_SUCCESS", () => {
      const users = [{ email: "test@gmail.com", password: "test123" }];
      const expectedState = [{ email: "test@gmail.com", password: "test123" }];
      expect(
        loginUserReducer(initialState, {
          type: "USER_LOGIN_SUCCESS",
          payload: users,
        })
      ).toEqual({ loading: false, success: true, currentUser: expectedState });
    });
    it("should handle USER_LOGIN_FAILED", () => {
      expect(
        loginUserReducer(initialState, {
          type: "USER_LOGIN_FAILED",
          payload: "User not found",
        })
      ).toEqual({ loading: false, error: "User not found" });
    });
    it("should handle USER_LOGOUT", () => {
      expect(loginUserReducer(initialState, { type: "USER_LOGOUT" })).toEqual(
        initialState
      );
    });
  });

  describe("registerUserReducer", () => {
    const initialState = {};
    it("should return the empty state", () => {
      expect(registerUserReducer(undefined, {})).toEqual({});
    });
    it("should handle USER_REGISTER_REQUEST", () => {
      expect(
        registerUserReducer(initialState, {
          type: "USER_REGISTER_REQUEST",
        })
      ).toEqual({ loading: true });
    });
    it("should handle USER_REGISTER_SUCCESS", () => {
      const users = [
        {
          name: "tester",
          email: "test@gmail.com",
          password: "test123",
          mybalance: "1200",
          cart: [],
          favourite: [],
        },
      ];
      expect(
        registerUserReducer(initialState, {
          type: "USER_REGISTER_SUCCESS",
          payload: users,
        })
      ).toEqual({ loading: false, success: true });
    });
    it("should handle USER_REGISTER_FAILED", () => {
      expect(
        registerUserReducer(initialState, {
          type: "USER_REGISTER_FAILED",
          payload: "User not found",
        })
      ).toEqual({ loading: false, error: "User not found" });
    });
  });
});
