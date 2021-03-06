import { createContext, useState, useEffect} from "react"
export const ProgramContext= createContext();

const ProgramContextProvider=(props)=>{
  const [allPrograms, setAllPrograms] = useState(null);
  const [programs, setPrograms]= useState(null);
  const [program, setProgram]= useState(null);
  const [programsByCategory, setProgramsByCategory]=useState(null)
  const [episodes] = useState(null);

  useEffect(() => {
    getAllPrograms();
  }, [])

  const getAllPrograms = async ()=>{
    let programs = await fetch (`/api/v1/programs/allprogram`);
    programs = await programs.json();
    setAllPrograms(programs)
  }

  const getProgramsByChannelId = async (channelId)=>{
    let programs = await fetch(`/api/v1/programs/${channelId}`);
    programs = await  programs.json();
    let sorted =[...programs].sort((a,b)=>(a.name > b.name ? 1: -1))
    setPrograms(sorted);
  }

  const getProgramByProgramId =async (programId)=>{
    let program = await fetch(`/api/v1/programs/allprogram/${programId}`);
    program = await program.json();
    setProgram(program)
  }
  const getProgramsByCategory = async (categoryId)=>{
    let programs = await fetch(`/api/v1//programs/categories/${categoryId}`);
    programs = await programs.json();
    let sorted =[...programs].sort((a,b)=>(a.name >b.name ? 1: -1))
    setProgramsByCategory(sorted);
  }

  const values ={
    allPrograms,
    programs,
    programsByCategory,
    getProgramsByChannelId,
    program,
    getProgramByProgramId,
    getProgramsByCategory,
    episodes,

  }

  return (
  <ProgramContext.Provider value ={values}>
    {props.children }
  </ProgramContext.Provider>
  )

}

export default ProgramContextProvider