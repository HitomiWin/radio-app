import  { useContext, useEffect } from "react";
import { ProgramContext } from "../contexts/ProgramContext";
import { UserContext } from "../contexts/UserContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import Back from "./Back"
import {useHistory} from "react-router-dom"
import { Card,  Container, Col, Row} from "react-bootstrap";
import { Tag } from 'react-bootstrap-icons';
import styles from "../css/ProgramsPage.module.css"

const ProgramsByChannelId=(props)=> {
  const { programs, getProgramsByChannelId } = useContext( ProgramContext );
  const { addProgramToFavorites } = useContext( FavoriteContext );
  const history =useHistory();
  const handleClick=(programId)=>{
    history.push(`/programs/allprogram/${programId}`)
  }
  useEffect(()=>{
    getProgramsByChannelId(props.channelId);
         // eslint-disable-next-line
  },[props.channelId, programs]);
  

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
       </Row>
     </Card>
      </Col>
     ))
   )
 } 
  return (
    <div className={styles.programs}>
      <Back />      
      <h2 >Program A-Ö</h2>
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
