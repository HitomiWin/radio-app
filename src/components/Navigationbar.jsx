import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { CategoryContext} from "../contexts/CategoryContext";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom"
import styles from "../css/Navbar.module.css";
const Navigationbar=()=> {
  const { categories, getCategoryName }=useContext(CategoryContext);
  const history = useHistory();
  const handleOnClick=(categoryId,categoryName)=>{
    getCategoryName(categoryName)
    history.push(`/categories/${categoryId}`)

  }
  const renderNavDropDownItem =()=>{
    return categories.map((category)=>
    <NavDropdown.Item key={category.id} onClick={()=>{handleOnClick(category.id,category.name)}}>{category.name}</NavDropdown.Item>
    )
  }
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>
      <NavLink className ={styles.logo } to="/">SverigesRadio</NavLink>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto pr-md-5">
        <NavLink className ={styles.link } to="/" >Kanaler</NavLink>
        <NavDropdown className="pr-md-5" title="Kategorier" id="collasible-nav-dropdown">
         {categories&& renderNavDropDownItem()}
        </NavDropdown>
        <NavLink className ={styles.link } to="/" >Mina Favoriter</NavLink>
        <NavLink className ={styles.link } to="/" >Login</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Navigationbar
