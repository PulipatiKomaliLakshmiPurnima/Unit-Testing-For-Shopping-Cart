import "../css/Header.css";
import React from "react";
import Search from "./Search";
import { NavLink } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/UserAction";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

const categories = [
  "Electronics",
  "Fashion",
  "Healthy & Beauty",
  "Sports",
  "Outdoor",
  "Home & Furniture",
  "Travel",
  "Children",
];

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  const getCartCount = () => {
    return currentUser.cart?.reduce(
      (quantity, item) => Number(item.quantity) + quantity,
      0
    );
  };

  return (
    <>
      <div className="header1">
        <div className="fixed-top bg-white">
          <Container>
            <div className="row mt-3 ">
              <div href="/" className="brand col-lg-7 col-md-5 col-sm-12">
                <a href="/" className="text-decoration-none text-black fs-2">
                  Cognizant|Cheers
                </a>
              </div>
              <div className="icons d-flex col-lg-5 col-md-7 col-sm-12">
                <div className="search mt-2 me-2" data-testid="search">
                  <Search />
                </div>
                <div className="heart__products flex pointer relative">
                  <Nav.Link
                    href="/favourite"
                    style={{ color: "black" }}
                    className="d-flex me-3"
                    data-testid="test"
                  >
                    <h3 style={{ fontSize: "35px" }}>
                      <AiOutlineHeart />
                    </h3>
                    <span
                      className="heart_numbers"
                      data-testid="favouritenumber"
                    >
                      {currentUser ? currentUser.favourite?.length : 0}
                    </span>
                  </Nav.Link>
                </div>
                <div className="cart__items flex pointer relative">
                  <Nav.Link
                    href="/cart"
                    style={{ color: "black" }}
                    className="d-flex me-3"
                    data-testid="test1"
                  >
                    <h3 style={{ fontSize: "35px" }}>
                      <AiOutlineShoppingCart />
                    </h3>
                    <span className="cart_numbers" data-testid="cartnumber">
                      {currentUser ? getCartCount() : 0}
                    </span>
                  </Nav.Link>
                </div>
                <div className="userid me-3">
                  {currentUser ? (
                    <>
                      <NavDropdown
                        title={<IoMdContact />}
                        style={{ fontSize: "30px" }}
                        data-testid="dropdown"
                      >
                        <NavDropdown.Item
                          id="username"
                          data-testid="username"
                          style={{ color: "black" }}
                        >
                          {currentUser.name?.toUpperCase()}
                        </NavDropdown.Item>
                        <NavDropdown.Item data-testid="userbalance">
                          My Balance:<h6>{currentUser.mybalance}</h6>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={logoutHandler}
                          data-testid="userlogout"
                        >
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Nav.Link
                      href="/login"
                      data-testid="test2"
                      style={{ color: "black" }}
                    >
                      <h3 style={{ fontSize: "35px" }}>
                        <IoMdContact />
                      </h3>
                    </Nav.Link>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className="header2">
        <Navbar bg="white" expand="lg">
          <Container>
            <h4 className="menu" data-testid="menu">
              Category Menu
            </h4>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              data-testid="toggle"
              style={{ border: "none", color: "black" }}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="navbar-nav">
                {categories.map((category, index) => (
                  <NavLink
                    to={"/" + category}
                    className="categoryd me-5"
                    style={{ textDecoration: "none", color: "black" }}
                    key={index}
                  >
                    <h6 className="mr-5 categoryd" data-testid="categoryname">
                      {category}
                    </h6>
                  </NavLink>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="mobile" data-testid="msearch">
        <Search />
      </div>
    </>
  );
};
export default Header;
