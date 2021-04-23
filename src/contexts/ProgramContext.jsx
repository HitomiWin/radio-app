import { createContext, useState, useEffect } from "react"
export const ProgramContext= createContext();

const ProgramContextProvider=(props)=>{
  const [programs, setPrograms]= useState(null);

  const getProgramsByChannelId = async (channelId)=>{
    let programs = await fetch(`/api/v1/programs/${channelId}`);
    programs = await  programs.json();
    let sorted =[...programs].sort((a,b)=>(a.name >b .name ? 1: -1))
    setPrograms(sorted)
}

  const values ={
    programs,
    getProgramsByChannelId
  }

  return (
  <ProgramContext.Provider value ={values}>
    {props.children }
  </ProgramContext.Provider>
  )

}

export default ProgramContextProvider