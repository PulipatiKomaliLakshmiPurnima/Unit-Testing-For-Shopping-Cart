import "../App.css";
import { useAlert } from "react-alert";
import Search from "../component/Search";
import Slider from "@mui/material/Slider";
import { BsGrid1X2 } from "react-icons/bs";
import SideNav from "../component/SideNav";
import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { FcHome, FcShop } from "react-icons/fc";
import {
  getProduct,
  clearErrors,
  filterProducts,
} from "../redux/actions/ProductAction";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [show, setshow] = useState(false);
  const keyword = id?.keyword;
  const { category, subcat } = useParams();
  const [price, setPrice] = useState([0, 109900]);
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );
  const { currentUser } = useSelector((state) => state.loginUserReducer);

  useEffect(() => {
    if (category && !subcat) {
      dispatch(filterProducts({ categoryFilter: category }));
    } else if (category && subcat) {
      dispatch(filterProducts({ subcategoryFilter: subcat }));
    } else {
      if (error) {
        alert?.error(error);
        dispatch(clearErrors());
      }
      dispatch(getProduct(keyword, price));
    }
  }, [dispatch, category, subcat, keyword, alert, error, price]);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const login = (e) => {
    if (currentUser) {
      setInput(e);
    } else {
      alert?.error("Please Login to access this resource");
    }
  };
  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const handleShow = () => {
    setshow(true);
  };

  const handleClose = () => {
    setshow(false);
  };

  const slidershow = document.getElementById("slider-show");
  if (slidershow) {
    if (input === "pricerange") {
      slidershow.style.display = "block";
    } else {
      slidershow.style.display = "none";
    }
  }

  const slider = document.getElementById("slider");
  if (slider !== null) {
    if (input === "pricerange" && slider !== null) {
      slider.style.display = "block";
    } else {
      slider.style.display = "none";
    }
  }

  return (
    <>
      <Container>
        <div className="d-flex mt-5">
          <Link
            to={`/`}
            className="text-decoration-none text-black"
            data-testid="link-to-home"
          >
            <h6>
              <FcHome className="fs-4" />
              Home
            </h6>
            &nbsp;
          </Link>
          <h6>|</h6>&nbsp;
          <Link
            to={`/cart`}
            className="text-decoration-none text-black"
            data-testid="link-to-shoppingcart"
          >
            <h6>
              <FcShop className="fs-4" />
              Shopping Cart
            </h6>
          </Link>
        </div>
        <div>
          <h4 className="mt-3">Top Results</h4>
          <h5
            style={{ float: "right", marginTop: "-30px" }}
            data-testid="products-count"
          >
            {products &&
              products.filter((val) => {
                if (input === "") {
                  return val;
                } else if (input === "filterbymybalance") {
                  if (currentUser) {
                    return val.price <= currentUser.mybalance
                      ? currentUser.mybalance
                      : 0;
                  }
                } else if (input === "anyprice") {
                  return val;
                } else if (input === "pricerange") {
                  return val;
                }
              }).length}
          </h5>
        </div>
        <hr />
        <Row>
          <Col lg={3}>
            <div className="mobilesortfilter" onClick={() => handleShow()}>
              <h5 style={{ color: "black" }} data-testid="modal-btn">
                <BsGrid1X2
                  style={{
                    color: "blue",
                    fontSize: "25px",
                    marginRight: "5px",
                  }}
                />
                Filters
              </h5>
            </div>
            <Modal
              show={show}
              onHide={handleClose}
              className="modaldata"
              data-testid="modal"
            >
              <Modal.Header
                closeButton
                onClick={handleClose}
                data-testid="closebutton"
              >
                <Modal.Title data-testid="mfilter">Filters</Modal.Title>
              </Modal.Header>
              <Modal.Body className="m-3">
                <div>
                  <h5 data-testid="mprice">Price</h5>
                  <div className="form-check">
                    <input
                      value="anyprice"
                      data-testid="manyprice"
                      onChange={(e) => setInput(e.target.value)}
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      data-testid="manypricel"
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Any Price
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      data-testid="mbalance"
                      type="radio"
                      value="filterbymybalance"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={(e) => login(e.target.value)}
                    />
                    <label
                      data-testid="mbalancel"
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Filter by my balance
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      data-testid="mpricerange"
                      type="radio"
                      value="pricerange"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <label
                      data-testid="mpricerangel"
                      className="form-check-label"
                      htmlFor="flexRadioDefault3"
                    >
                      Price Range
                    </label>
                    <div id="slider" data-testid="msliderd">
                      <Slider
                        data-testid="mslider"
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={109900}
                      />
                      <h6 data-testid="mminvalue">Minimum Value:{price[0]}</h6>
                      <h6 data-testid="mmaxvalue">Maximum Value:{price[1]}</h6>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 data-testid="mcategories">Categories</h5>
                  <Link
                    to="/"
                    className="text-decoration-none text-dark"
                    data-testid="mallcategorylink"
                  >
                    <h6
                      className="p-3 h-50%"
                      data-testid="mallcategory"
                      style={{ background: "lightgray", cursor: "pointer" }}
                    >
                      AllCategories &nbsp;&nbsp;<span>({productsCount})</span>
                    </h6>
                  </Link>
                  <SideNav />
                </div>
                <div className="mb-5">
                  <label data-testid="mbrand">
                    <b>Brand</b>
                  </label>
                  <Search />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="filterhide">
              <h5 data-testid="dfilter">Filters</h5>
              <hr />
              <div>
                <h5 data-testid="dprice">Price</h5>
                <div className="form-check">
                  <input
                    value="anyprice"
                    data-testid="danyprice"
                    onChange={(e) => setInput(e.target.value)}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    data-testid="danypricel"
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Any Price
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    data-testid="dbalance"
                    type="radio"
                    value="filterbymybalance"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    onChange={(e) => login(e.target.value)}
                  />
                  <label
                    data-testid="dbalancel"
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Filter by my balance
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    data-testid="dpricerange"
                    type="radio"
                    value="pricerange"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <label
                    data-testid="dpricerangel"
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Price Range
                  </label>
                  <div id="slider-show" data-testid="dsliderd">
                    <Slider
                      value={price}
                      data-testid="dslider"
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={109900}
                    />
                    <h6 data-testid="dminvalue">Minimum Value:{price[0]}</h6>
                    <h6 data-testid="dmaxvalue">Maximum Value:{price[1]}</h6>
                  </div>
                </div>
              </div>
              <div>
                <h5 data-testid="dcategories">Categories</h5>
                <Link
                  to="/"
                  className="text-decoration-none text-dark"
                  data-testid="dallcategorylink"
                >
                  <h6
                    className="p-3 h-50%"
                    data-testid="dallcategory"
                    style={{ background: "lightgray", cursor: "pointer" }}
                  >
                    AllCategories &nbsp;&nbsp;<span>({productsCount})</span>
                  </h6>
                </Link>
                <SideNav />
              </div>
              <div className="mb-5">
                <label data-testid="dbrand">
                  <b>Brand</b>
                </label>
                <Search />
              </div>
            </div>
          </Col>
          <Col lg={1}></Col>
          <Col lg={8}>
            <div className="d-flex sortingdata">
              <h5 style={{ float: "right" }}>Sort by:&nbsp;</h5>
              <div className="select" value={select}>
                <select
                  onChange={handleChange}
                  className="form-select"
                  data-testid="dropdown"
                >
                  <option>Select Option</option>
                  <option value="mostpopular">Most Popular</option>
                  <option value="lowtohigh">Price - Low to High</option>
                  <option value="hightolow">Price - High to Low</option>
                </select>
              </div>
            </div>
            <Row className="mt-5">
              {loading ? (
                <h3 data-testid="loading">Loading...</h3>
              ) : (
                <>
                  {products &&
                    products
                      .filter((val) => {
                        if (input === "") {
                          return val;
                        } else if (input === "filterbymybalance") {
                          if (currentUser) {
                            return val.price <= currentUser.mybalance
                              ? currentUser.mybalance
                              : 0;
                          }
                        } else if (input === "anyprice") {
                          return val;
                        } else if (input === "pricerange") {
                          return val;
                        }
                      })
                      .sort((a, b) => {
                        if (select === "mostpopular") {
                          return b.sales - a.sales;
                        } else if (select === "lowtohigh") {
                          return a.price - b.price;
                        } else if (select === "hightolow") {
                          return b.price - a.price;
                        }
                      })
                      .map((product) => (
                        <Col
                          lg={6}
                          md={6}
                          xs={12}
                          xl={4}
                          className="my-5"
                          data-testid="productcard"
                          key={product._id}
                        >
                          <ProductCard product={product} />
                        </Col>
                      ))}
                  {products?.length === 0 && <h4>No results found</h4>}
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
