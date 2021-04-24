import { useContext, useEffect, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext"

const ChannelSchedule=()=>{
  const { schedule }=useContext(ChannelContext);
  console.log(schedule)
  return(
    <div>Hej</div>
  )
}

export default ChannelSchedule