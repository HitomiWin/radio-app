import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";
import { UserContext } from "../contexts/UserContext";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../css/Navbar.module.css";
const Navigationbar = () => {
  const { categories } = useContext(CategoryContext);
  const { user, logout } = useContext(UserContext);
  const history = useHistory();
  const handleOnClickCategory = (categoryId) => {
    history.push(`/programs/categories/${categoryId}`);
  };
  const handleOnclickLogout = async () => {
    await logout();
  };
  const renderNavDropDownItem = () => {
    return categories.map((category) => (
      <NavDropdown.Item
        key={category.id}
        onClick={() => {
          handleOnClickCategory(category.id);
        }}
      >
        {category.name}
      </NavDropdown.Item>
    ));
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <NavLink className={styles.logo} to="/">
          SverigesRadio
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto pr-md-5">
          <NavLink className={styles.link} to="/">
            Kanaler
          </NavLink>
          <NavDropdown
            className="pr-md-5"
            title="Kategorier"
            id="collasible-nav-dropdown"
          >
            {categories && renderNavDropDownItem()}
          </NavDropdown>
          {user ? (
            <NavLink className={styles.link} to="/favorite">
              Mina Favoriter
            </NavLink>
          ) : (
            ""
          )}
          {user ? (
            <NavLink
              to="/"
              onClick={() => {
                handleOnclickLogout();
              }}
              className={styles.link}
            >
              Logga ut / {user.userName}
            </NavLink>
          ) : (
            <NavLink className={styles.link} to="/users/login">
              Logga in
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
