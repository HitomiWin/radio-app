import { useContext, useEffect, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext"
import { ProgramContext } from "../contexts/ProgramContext"
import ProgramsByChannelId from "../components/ProgramsByCannelId"

import styles from "../css/ProgramsPage.module.css"
const ProgramsPage=(props)=> {
  const { singleChannel, getChannelById }=useContext(ChannelContext);
  const { channelId } = props.match.params;
  const [ showPrograms, setShowPrograms ]=useState(true);
  const { programs , getProgramsByChannelId } = useContext( ProgramContext )
  useEffect(() => {
   getChannelById(channelId)
  }, [])
   useEffect(()=>{
    getProgramsByChannelId(channelId);
  },[channelId])

 const renderMenuBar=()=>{
   return (         
    <ul className={styles. menuList} >
      <li className={styles.listItem}><img className={styles.channelImage} src={singleChannel.image} /></li>
      <li className={styles.listItem}>Tablå</li>
      <li className={styles.listItem}>{singleChannel.name} Program</li>
    </ul>
   )
 }
   
  return (
    <div className={styles.programPage}>
    {singleChannel&& renderMenuBar()}
    {showPrograms&&< ProgramsByChannelId />}
    </div>
  )
}

export default ProgramsPage
