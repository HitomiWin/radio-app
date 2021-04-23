import { useContext, useEffect} from "react"
import { CategoryContext } from "../contexts/CategoryContext"
import { Dropdown } from "react-bootstrap"
import styles from "../css/ProgramsByCategory.module.css"

const ProgramsByCategory = (props) => {

  const {programsByCategory, getProgramsByCategory,categoryName} =useContext(CategoryContext)
  const {categoryId}=props.match.params;
  useEffect(() => {
    getProgramsByCategory(categoryId);
  }, []);
 
  const renderMenuBar = () => {
    return (
      <ul className={styles.menuList}>
        <li className={styles.listItem}>{categoryName}</li>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    );
  };

  return <div>
    { renderMenuBar() }
  </div>;
};
export default ProgramsByCategory;
