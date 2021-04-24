import { useContext, useEffect, useState } from "react";
import { ProgramContext } from "../contexts/ProgramContext"
import {useHistory} from "react-router-dom"
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import styles from "../css/ProgramsPage.module.css"
const ProgramsByChannelId=()=> {
  const { programs , getProgramsByChannelId } = useContext( ProgramContext );
  const history =useHistory();
  const handleClick=(programId)=>{
    history.push(`/programs/allprogram/${programId}`)
  }  
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
