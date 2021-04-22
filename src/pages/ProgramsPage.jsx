import { useContext, useEffect } from "react";
import { ProgramContext } from "../contexts/ProgramContext"
const ProgramsPage=(props)=> {
  const { programs , getProgramsByChannelId } = useContext( ProgramContext )
  const { channelId } = props.match.params;
  useEffect(()=>{
    getProgramsByChannelId(channelId);
  },[channelId])

     const renderPrograms=()=>{
      return programs.map((program)=>(
      <div><p>{program.name}</p></div>
      ))}
  return (
    <div>
      <h1>This is programs By channelId</h1>
      { programs && renderPrograms()}
    </div>
  )
}

export default ProgramsPage
