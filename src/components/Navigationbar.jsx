import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom"
import styles from "../css/Navbar.module.css";
function Navigationbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand to="/">SverigesRadio</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto pr-md-5">
        <NavLink className ={styles.link } to="/" >Home</NavLink>
        <NavLink className ={styles.link } to="/" >Programs</NavLink>
        <NavDropdown className="pr-md-5" title="Kanaler" id="collasible-nav-dropdown">
          <NavDropdown.Item >P1</NavDropdown.Item>
          <NavDropdown.Item >P2</NavDropdown.Item>
          <NavDropdown.Item>P3</NavDropdown.Item>
        </NavDropdown>
        <NavLink className ={styles.link } to="/" >Login</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Navigationbar
