import { useContext, useEffect, useState } from "react";
import { ProgramContext } from "../contexts/ProgramContext";
import { UserContext } from "../contexts/UserContext";
import {useHistory} from "react-router-dom"
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import { Tag, Heart } from 'react-bootstrap-icons';
import styles from "../css/ProgramsPage.module.css"
const ProgramsByChannelId=(props)=> {
  const { programsByChannelId , getProgramsByChannelId } = useContext( ProgramContext );
  const { user } = useContext ( UserContext );
  const history =useHistory();
  const handleClick=(programId)=>{
    history.push(`/programs/allprogram/${programId}`)
  }
  useEffect(()=>{
    getProgramsByChannelId(props.channelId);
  },[props.channelId])  

  const renderPrograms=()=>{
   return (
    programsByChannelId.map((program)=>(
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
       <Col  xs={1}  style={{paddingTop:"1.25rem"}} >
           <Heart color="gray" size={25}/ > 
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
      {programsByChannelId && renderPrograms()}
      </Row> 
      </Container>
    </div>
  )
}

export default ProgramsByChannelId
