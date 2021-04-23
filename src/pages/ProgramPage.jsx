import { useContext, useEffect, useState } from "react";
import { ProgramContext } from "../contexts/ProgramContext";
import ProgramInfo from "../components/ProgramInfo"
import styles from "../css/ProgramsPage.module.css"

const ProgramPage=(props)=>{
   const {program , getProgramByProgramId} = useContext(ProgramContext);
   const {programId} = props.match.params;
   const [ showProgramInfo, setShowProgramInfo ]=useState(true);
   useEffect (()=>{
      getProgramByProgramId(programId)
   },[])

   const handleOnclickOm=()=>{
     setShowProgramInfo(true)
   }
   const renderMenuBar=()=>{
    return (         
     <ul className={styles. menuList} >
       <li className={styles.listItem}><img className={styles.channelImage} src={program.programimagewide} /></li>
       <li className={styles.programName}>{program.name}</li>
       <li className={styles.listItem}>Alla avsnitt</li>
       <li className={styles.listItem} onClick={()=>handleOnclickOm()}>Om...</li>
     </ul>
    )
  }

  return(
    <div>
      {program && renderMenuBar()}
      {showProgramInfo && <ProgramInfo/>}
    </div>
   

  )
}

export default ProgramPage
