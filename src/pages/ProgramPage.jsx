import { useContext, useEffect } from "react";
import { ProgramContext } from "../contexts/ProgramContext";
import ProgramInfo from "../components/ProgramInfo"
import styles from "../css/ProgramsPage.module.css"

const ProgramPage=(props)=>{
   const {program , getProgramByProgramId} = useContext(ProgramContext);
   const {programId} = props.match.params;

   useEffect (()=>{
      getProgramByProgramId(programId)
   },[])

   const renderMenuBar=()=>{
    return (         
     <ul className={styles. menuList} >
       <li className={styles.listItem}><img className={styles.channelImage} src={program.programimagewide} /></li>
       <li className={styles.programName}>{program.name}</li>
     </ul>
    )
  }

  return(
    <div>
      {program ?renderMenuBar() :<h1>Loading...</h1>}
      {program ? <ProgramInfo/>:<h1>Loading...</h1>}
    
    </div>
   

  )
}

export default ProgramPage
