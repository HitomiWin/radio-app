import { useContext, useEffect, useState } from "react";
import { ProgramContext } from "../contexts/ProgramContext"
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import styles from "../css/ProgramsPage.module.css"
const ProgramsByChannelId=(props)=> {
  const { programs , getProgramsByChannelId } = useContext( ProgramContext );

 const renderPrograms=()=>{
   return (
     programs.map((program)=>(
      // <Card key={program.id} onClick={() => handleClick(program.id) }>
      <Col key={program.id} xs={12} md={12} lg={6}>
      <Card  >
      <Row>
       <Col xs={12} md={3} lg={3} style={{padding:"1.25rem"}}>
         <Card.Img src={program.programimagewide} alt={"program image"}/>
       </Col>
       <Col xs={12} md={8} lg={8}>
       <Card.Body>
         <Card.Title>{program.name}</Card.Title>
         <Card.Text>{program.channel.name}</Card.Text>
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
