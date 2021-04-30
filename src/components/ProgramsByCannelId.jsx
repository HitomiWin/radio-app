import { useContext, useEffect } from "react";
import { ProgramContext } from "../contexts/ProgramContext";
import { UserContext } from "../contexts/UserContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import {useHistory} from "react-router-dom"
import { Card,  Container, Col, Row, Button} from "react-bootstrap";
import { Tag } from 'react-bootstrap-icons';
import styles from "../css/ProgramsPage.module.css"
const ProgramsByChannelId=(props)=> {
  const { programs, getProgramsByChannelId } = useContext( ProgramContext );
  const { addProgramToFavorites } = useContext( FavoriteContext );
  const { user } = useContext ( UserContext );
  const history =useHistory();
  const handleClick=(programId)=>{
    history.push(`/programs/allprogram/${programId}`)
  }
  useEffect(()=>{
    getProgramsByChannelId(props.channelId);
         // eslint-disable-next-line
  },[props.channelId, programs]);
  
  const handleOnClickLike= async (e, programId, channelId)=>{
    e.stopPropagation()
    let favoriteProgram ={
      programId,
    }
    let result = await  addProgramToFavorites(favoriteProgram, channelId);
    if (result.success ) {
      console.log(result.success)
    } else {
      console.log(result.error)
    }
  };


  const renderPrograms=()=>{
   return (
    programs.map((program)=>(
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
       {user &&
       <Col  xs={1}  style={{paddingTop:"1.25rem"}} className={styles.heart} >
           <Button variant="info"  onClick={(e)=>{handleOnClickLike(e,program.id, props.channelId)}}>Like</Button> 
        </Col> }    
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
      {programs && renderPrograms()}
      </Row> 
      </Container>
    </div>
  )
}

export default ProgramsByChannelId
