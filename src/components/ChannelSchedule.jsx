import { useContext, useEffect, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext"
import { Card, Container, Col, Row } from "react-bootstrap";
import {card, menuList, listItem, time, scheduleContainer, menubar, active, inactive} from "../css/ChannelSchedule.module.css"
const ChannelSchedule=()=>{
  const { schedule }=useContext(ChannelContext);
  console.log(schedule.map((s)=>(s.starttimeutc.slice(11,16))));
  const [ today, setToday]=useState(true)
  const [ tomorrow, settomorrow]=useState(false)
  const [ yesterday, setYesterday]=useState(false)


  const renderMenuBar=()=>{
    return (         
     <ul className={`${menuList}`} >
       <li className={listItem}><span className={`${yesterday ? active :inactive}`}>Igår</span></li>
       <li className={listItem} ><span className={`${today ? active :inactive}`}>Idag</span></li>
       <li className={listItem} ><span className={` ${tomorrow ? active :inactive}`}>Imorgon</span></li>
     </ul>
    )
  }
  const renderSchedule=()=>{
    return (
      schedule.map((episode,i)=>(
       <Col key={i} xs={12}>
       <Card className={card} >
       <Row>
         <Col xs={12} md={2} >
         <div className={`${time}`}>{episode.starttimeutc.slice(11,16)}</div></Col>
        <Col xs={12} md={2} style={{padding:"1.25rem"}}>
          <Card.Img src={episode.imageurl} alt={"episode image"}/>
        </Col>
        <Col xs={12} md={8} >
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
    <div className={`${scheduleContainer}`}>
      <div className={`${menubar}`}>
      {renderMenuBar()}
      </div>
      <Container >
      <Row>      
      {schedule && renderSchedule()}
      </Row> 
      </Container>
    </div>
  )
}

export default ChannelSchedule