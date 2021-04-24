import { useContext, useEffect, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext"

const ChannelSchedule=()=>{
  const { schedule }=useContext(ChannelContext);
  console.log(schedule)
  return(
    <div>{schedule.map((episode)=>(<p>{episode.title}</p>))}</div>
  )
}

export default ChannelSchedule