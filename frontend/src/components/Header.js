import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { ReactComponent as Logo } from "../images/logo.svg"

const navbarStyle = {
  backgroundColor: "#eee"
}

const Header = ({ title }) => { // or simply pass 'props' without destructuring and you could access it through for instance 'props.title'
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo alt={title} style={{ maxWidth: "12rem", maxHeight: "2rem" }}></Logo>
        {/* <Navbar.Brand href="/">{title}</Navbar.Brand> */}
      </Container>
    </Navbar>
  ); // with <Container> you're allowed to use <Row>, <Col>, xs, md and lg properties!
};

export default Header;