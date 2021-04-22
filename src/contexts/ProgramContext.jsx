import { createContext, useState, useEffect } from "react"
export const ProgramContext= createContext();

const ProgramContextProvider=(props)=>{
  const [programs, setPrograms]= useState(null);

  const getProgramsByChannelId = async (channelId)=>{
    let fetchedprograms = await fetch(`/api/v1/programs/${channelId}`);
    fetchedprograms = await  fetchedprograms.json();
    console.log(fetchedprograms)
    setPrograms( fetchedprograms)
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