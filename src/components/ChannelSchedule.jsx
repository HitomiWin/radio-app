import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import Schedule from "./Schedule"
import { Container, Row } from "react-bootstrap";
import {
  menuList,
  listItem,
  scheduleContainer,
  menubar,
  active,
  inactive,
} from "../css/ChannelSchedule.module.css";
const ChannelSchedule = (props) => {
  const { schedule, getChannelSchedule } = useContext(ChannelContext);
  const [today, setToday] = useState(true);
  const [tomorrow, setTomorrow] = useState(false);
  const [yesterday, setYesterday] = useState(false);
  const [date, setDate] = useState(new Date().getFullYear() + "-" + (new Date().getMonth()+1)  +"-" + new Date().getDate())
  const handleOnclickYesterday=()=>{
    setToday(false);
    setTomorrow(false);
    setYesterday(true);
    let yesterdayDate =new Date(new Date().setDate(new Date().getDate() - 1)) 
    yesterdayDate = yesterdayDate.getFullYear() + "-" + (yesterdayDate.getMonth()+1)  +"-" + (yesterdayDate.getDate());
    console.log(yesterdayDate)
    setDate(yesterdayDate)  
  }
  const handleOnclickToday=()=>{
    setToday(true);
    setTomorrow(false);
    setYesterday(false);

    let todayDate =new Date().getFullYear() + "-" + (new Date().getMonth()+1)  +"-" + new Date().getDate()
    setDate(todayDate)  
  }
  const handleOnclickTomorrow=()=>{
    setToday(false);
    setTomorrow(true);
    setYesterday(false);
    let tomorrowDate =new Date(new Date().setDate(new Date().getDate() + 1)) 
    tomorrowDate = tomorrowDate.getFullYear() + "-" + (tomorrowDate.getMonth()+1)  +"-" + (tomorrowDate.getDate());
    setDate(tomorrowDate)  
  }
  useEffect(()=>{
    getChannelSchedule(props.channelId, date);
    console.log(date)
  },[props.channelId,date])

  const renderMenuBar = () => {
    return (
      <ul className={`${menuList}`}>
        <li className={listItem}>
          <span className={`${yesterday ? active : inactive}`} onClick={()=>{handleOnclickYesterday()}}>Igår</span>
        </li>
        <li className={listItem}>
          <span className={`${today ? active : inactive}`} onClick={()=>{handleOnclickToday()}}>Idag</span>
        </li>
        <li className={listItem}>
          <span className={` ${tomorrow ? active : inactive}`} onClick={()=>{handleOnclickTomorrow()}}>Imorgon</span>
        </li>
      </ul>
    );
  };

  return (
    <div className={`${scheduleContainer}`}>
      <div className={`${menubar}`}>{renderMenuBar()}</div>
      <Container>
        <Row>{schedule && <Schedule schedule={schedule} />}</Row>
      </Container>
    </div>
  );
};

export default ChannelSchedule;
