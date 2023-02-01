import {
  productsReducer,
  productDetailsReducer,
} from "../../../redux/reducers/ProductReducer";
describe("ProductReducer", () => {
  describe("productReducer", () => {
    const initialState = { products: [] };
    const data = [
      {
        _id: "1",
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
      },
      {
        _id: "2",
        name: "SAMSUNG Galaxy F13 (Waterfall Blue, 64 GB)  (4 GB RAM)",
        description:
          "Enjoy seamless connectivity and an uninterrupted movie marathon with the impressive Samsung Galaxy F13 that is designed specifically to impress the entertainment fanatics. This smartphone features a terrific 16.62 cm (6.6) FHD+ LCD Display that can effortlessly blow your mind with its incredible performance. Furthermore, this phone boasts a 50 MP Triple Camera setup that allows you to capture awesomeness with a gentle tap. Moreover, the Samsung Galaxy F13 sports up to 8 GB of RAM and features an innovative RAM plus technology that taps into the phone’s internal storage to elevate its performance.",
        price: 2200,
        brand: "SAMSUNG",
        category: "Electronics",
        subcategory: "Mobiles",
        sales: 20,
        stock: 20,
        image:
          "https://rukminim1.flixcart.com/image/832/832/l4n2oi80/mobile/x/o/a/-original-imagfhu75eupxyft.jpeg?q=70",
      },
    ];
    const expectedState = [
      {
        _id: "1",
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
      },
      {
        _id: "2",
        name: "SAMSUNG Galaxy F13 (Waterfall Blue, 64 GB)  (4 GB RAM)",
        description:
          "Enjoy seamless connectivity and an uninterrupted movie marathon with the impressive Samsung Galaxy F13 that is designed specifically to impress the entertainment fanatics. This smartphone features a terrific 16.62 cm (6.6) FHD+ LCD Display that can effortlessly blow your mind with its incredible performance. Furthermore, this phone boasts a 50 MP Triple Camera setup that allows you to capture awesomeness with a gentle tap. Moreover, the Samsung Galaxy F13 sports up to 8 GB of RAM and features an innovative RAM plus technology that taps into the phone’s internal storage to elevate its performance.",
        price: 2200,
        brand: "SAMSUNG",
        category: "Electronics",
        subcategory: "Mobiles",
        sales: 20,
        stock: 20,
        image:
          "https://rukminim1.flixcart.com/image/832/832/l4n2oi80/mobile/x/o/a/-original-imagfhu75eupxyft.jpeg?q=70",
      },
    ];
    it("should return the empty state", () => {
      expect(productsReducer(undefined, [])).toEqual(initialState);
    });
    it("should handle ALL_PRODUCT_REQUEST", () => {
      expect(
        productsReducer(initialState, {
          type: "ALL_PRODUCT_REQUEST",
        })
      ).toEqual({ loading: true, products: [] });
    });
    it("should handle ALL_PRODUCT_SUCCESS", () => {
      expect(
        productsReducer(initialState, {
          type: "ALL_PRODUCT_SUCCESS",
          payload: {
            products: data,
          },
        })
      ).toEqual({
        loading: false,
        products: expectedState,
        productsCount: expectedState.productsCount,
      });
    });
    it("should handle GET_PRODUCTS", () => {
      expect(
        productsReducer(initialState, {
          type: "GET_PRODUCTS",
          payload: data,
        })
      ).toEqual({
        loading: false,
        products: expectedState,
      });
    });
    it("should handle ALL_PRODUCT_FAIL", () => {
      const errormsg = "Product not found";
      expect(
        productsReducer(undefined, {
          type: "ALL_PRODUCT_FAIL",
          payload: errormsg,
        })
      ).toEqual({ loading: false, error: "Product not found" });
    });
    it("should handle CLEAR_ERRORS", () => {
      expect(
        productsReducer(initialState, {
          type: "CLEAR_ERRORS",
        })
      ).toEqual({ error: null, products: [] });
    });
  });

  describe("productDetailsReducer", () => {
    const initialState = { product: {} };
    it("should return the empty state", () => {
      expect(productDetailsReducer(undefined, {})).toEqual(initialState);
    });
    it("should handle PRODUCT_DETAILS_REQUEST", () => {
      expect(
        productDetailsReducer(initialState, {
          type: "PRODUCT_DETAILS_REQUEST",
        })
      ).toEqual({ loading: true, product: {} });
    });
    it("should handle PRODUCT_DETAILS_SUCCESS", () => {
      const data = {
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
      const expectedState = {
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
      expect(
        productDetailsReducer(initialState, {
          type: "PRODUCT_DETAILS_SUCCESS",
          payload: data,
        })
      ).toEqual({ loading: false, product: expectedState });
    });
    it("should handle PRODUCT_DETAILS_FAIL", () => {
      expect(
        productDetailsReducer(undefined, {
          type: "PRODUCT_DETAILS_FAIL",
          payload: "Product not found",
        })
      ).toEqual({ loading: false, error: "Product not found" });
    });
    it("should handle CLEAR_ERRORS", () => {
      expect(
        productDetailsReducer(initialState, {
          type: "CLEAR_ERRORS",
        })
      ).toEqual({ error: null, product: {} });
    });
  });
});
