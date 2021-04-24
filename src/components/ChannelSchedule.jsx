import { useContext, useEffect, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext"
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import styles from "../css/ChannelSchedule.module.css"
const ChannelSchedule=()=>{
  const { schedule }=useContext(ChannelContext);
  console.log(schedule.map((s)=>(s.starttimeutc.slice(11,16))));
  const renderSchedule=()=>{
    return (
      schedule.map((episode,i)=>(
       <Col key={i} xs={12}>
       <Card  >
       <Row>
         <Col xs={2}>
         <div className={styles.time}>{episode.starttimeutc.slice(11,16)}</div></Col>
        <Col xs={2} style={{padding:"1.25rem"}}>
          <Card.Img src={episode.imageurl} alt={"episode image"}/>
        </Col>
        <Col xs={7} >
        <Card.Body>
          <Card.Title>{episode.title}</Card.Title>
          <Card.Text>{episode.description}</Card.Text>
        </Card.Body>
        </Col>
        </Row>
      </Card>
       </Col>
      ))
    )
  } 
  return(
    <div className={styles.schedule}>
      <Container >
      <Row>      
      {schedule && renderSchedule()}
      </Row> 
      </Container>
    </div>
  )
}

export default ChannelSchedule