import { useContext, useEffect, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext"

const ChannelSchedule=()=>{
  const { schedule }=useContext(ChannelContext);

  return(
    <div>Hej</div>
  )
}

export default ChannelSchedule