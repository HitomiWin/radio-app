import { useContext, useEffect} from "react"
import { useHistory } from "react-router-dom"
import { CategoryContext } from "../contexts/CategoryContext"
import { ProgramContext } from "../contexts/ProgramContext"
import { Card, Container, Col, Row } from "react-bootstrap";
import { Tag } from 'react-bootstrap-icons';
import styles from "../css/ProgramsByCategory.module.css"


const ProgramsByCategory = (props) => {
  const { category, getCategoryById } = useContext( CategoryContext )
  const {programs , getProgramsByCategory } = useContext( ProgramContext )
  const {categoryId} = props.match.params;
  const history = useHistory();
  useEffect(() => {
    getCategoryById(categoryId)
    getProgramsByCategory(categoryId);
         // eslint-disable-next-line
  }, [categoryId]);
 
  const handleClick=(programId)=>{
    history.push(`/programs/allprogram/${programId}`)
  }  
  const renderMenuBar = () => {
    return (
      <ul className={styles.menuList}>
        <li className={styles.listItem}>{category}</li>
      </ul>
    );
  };
  const renderPrograms=()=>{
    return (
      programs.map((program)=>(
       <Col key={program.id} xs={12} md={12} lg={6}   onClick={() => handleClick(program.id) }>
       <Card className={styles.card} >
       <Row>
        <Col xs={3} md={3} lg={3} style={{padding:"1.25rem"}}>
          <Card.Img src={program.programimagewide} alt={"program image"}/>
        </Col>
        <Col xs={8} md={8} lg={8}>
        <Card.Body>
          <Card.Title>{program.name}</Card.Title>
          <Card.Text>
          <Tag color="gray" size={25} />
            
            {program.programcategory["name"]}</Card.Text>
        </Card.Body>
        </Col>
        </Row>
      </Card>
       </Col>
      ))
    )
  } 
   return (
     <div className={styles.programs}>
       { renderMenuBar() }
       <hr />
       <Container >
       <Row >      
       {programs && renderPrograms()}
       </Row> 
       </Container>
     </div>
   )
};
export default ProgramsByCategory;
