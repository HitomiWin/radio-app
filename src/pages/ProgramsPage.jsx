import { useContext, useEffect, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext"
import { ProgramContext } from "../contexts/ProgramContext"
import ProgramsByChannelId from "../components/ProgramsByCannelId"
import ChannelSchedule from "../components/ChannelSchedule"
import styles from "../css/ProgramsPage.module.css"
const ProgramsPage=(props)=> {
  const { singleChannel, getChannelById, getChannelSchedule  }=useContext(ChannelContext);
  const { channelId } = props.match.params;
  const [ showPrograms, setShowPrograms ]=useState(true);
  const { getProgramsByChannelId } = useContext( ProgramContext );

  useEffect(() => {
    getChannelById(channelId)
  }, [])


  const handleOnclickSchedule =()=>{
    setShowPrograms(false)
  }
  const handleOnclickProgram=()=>{
    setShowPrograms(true)
  }
  

 const renderMenuBar=()=>{
   return (         
    <ul className={styles. menuList} >
      <li className={styles.listItem}><img className={styles.channelImage} src={singleChannel.image} /></li>
      <li className={styles.listItem} onClick={()=>handleOnclickSchedule()}>Tablå</li>
      <li className={styles.listItem} onClick={()=>handleOnclickProgram()}>{singleChannel.name} Program</li>
    </ul>
   )
 }
   
  return (
    <div className={styles.programPage}>
    {singleChannel&& renderMenuBar()}
    {showPrograms?< ProgramsByChannelId 
    channelId={channelId}/>:<ChannelSchedule channelId={channelId}/>}
    </div>
  )
}

export default ProgramsPage
