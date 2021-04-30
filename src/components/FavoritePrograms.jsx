
import { useContext, useEffect ,useState } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { ProgramContext } from "../contexts/ProgramContext";
import { useHistory } from "react-router-dom";
import { Card, Container, Col, Row } from "react-bootstrap";
import { Tag, HeartFill } from 'react-bootstrap-icons';
import styles from "../css/ProgramsPage.module.css"

 const FavoritePrograms=()=> {
  const { favoriteProgramIds, deleteFavoriteProgram } = useContext( FavoriteContext );
  const { allPrograms } = useContext( ProgramContext );
  const [favoritePrograms, setFavoritePrograms ] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getProgramsByFavoriteProgramIds();
  }, [favoriteProgramIds]);
  
  const getProgramsByFavoriteProgramIds=()=>{
    let result = allPrograms.filter((all)=>(
      favoriteProgramIds.find((fpi)=>(
        all.id===fpi.programId
      ))
    ))
    setFavoritePrograms(result)
  }

  const handleClick=(programId)=>{
    history.push(`/programs/allprogram/${programId}`)
  }

  const handleOnclickHeart=(e, programId)=>{
    e.stopPropagation();
    deleteFavoriteProgram(programId)
  }

  const renderFavoritePrograms=()=>{
    return (
     favoritePrograms.map((program)=>(
       <Col key={program.id} xs={12} md={12} lg={6}   onClick={() => handleClick(program.id) }>
       <Card className={styles.card} >
       <Row>
        <Col xs={3} style={{padding:"1.25rem"}}>
          <Card.Img src={program.programimagewide} alt={"program image"}/>
        </Col>
        <Col xs={7} >
        <Card.Body>
          <Card.Title>{program.name}</Card.Title>
          <Card.Text>
           <Tag color="gray" size={25} />
            {program.channel["name"]} </Card.Text>
        </Card.Body>
        </Col>
        <Col  xs={1}  style={{paddingTop:"1.25rem"}} >
            <HeartFill onClick={(e)=>{handleOnclickHeart(e, program.id)}} color="red" size={25} / > 
         </Col>     
        </Row>
      </Card>
       </Col>
      ))
    )
  } 
   return (
     <div className={styles.programs}>
       <h1 >Program A-Ö</h1>
       <hr />
       <Container >
       <Row >      
       {favoritePrograms && renderFavoritePrograms()}
       </Row> 
       </Container>
     </div>
   )
}

export default FavoritePrograms;