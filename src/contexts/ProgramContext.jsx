import { createContext, useState, useEffect } from "react"
export const ProgramContext= createContext();

const ProgramContextProvider=(props)=>{
  const [programs, setPrograms]= useState(null);
  const [program, setProgram]= useState(null);


  const getProgramsByChannelId = async (channelId)=>{
    let programs = await fetch(`/api/v1/programs/${channelId}`);
    programs = await  programs.json();
    let sorted =[...programs].sort((a,b)=>(a.name >b .name ? 1: -1))
    setPrograms(sorted);
  }

  const getProgramByProgramId =async (programId)=>{
    let program = await fetch(`/api/v1/programs/allprogram/${programId}`);
    program = await program.json();
    setProgram(program.program)
  }
  
  

  const values ={
    programs,
    getProgramsByChannelId,
    program,
    getProgramByProgramId,
  }

  return (
  <ProgramContext.Provider value ={values}>
    {props.children }
  </ProgramContext.Provider>
  )

}

export default ProgramContextProvider