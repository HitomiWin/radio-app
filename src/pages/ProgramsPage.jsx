import React,{ useContext, useEffect, useState, Suspense} from "react";
import { ChannelContext } from "../contexts/ChannelContext"
import styles from "../css/ProgramsPage.module.css"
const ProgramsByChannelId = React.lazy(()=> import ("../components/ProgramsByCannelId"))
const ChannelSchedule = React.lazy(()=> import ("../components/ChannelSchedule"))
const ProgramsPage=(props)=> {
  const { singleChannel, getChannelById }=useContext(ChannelContext);
  const { channelId } = props.match.params;
  const [ showPrograms, setShowPrograms ]=useState(true);


  useEffect(() => {
    getChannelById(channelId)
         // eslint-disable-next-line
  }, [])


  const handleOnclickSchedule =()=>{
    setShowPrograms(false)
  }
  const handleOnclickProgram=()=>{
    setShowPrograms(true)
  }

 const renderMenuBar=()=>{
   return (   
    <ul className={styles.menuList} >
      <li className={styles.listItem}><img className={styles.channelImage} src={singleChannel.image} alt="channel" /></li>
      <li className={styles.listItem} onClick={()=>handleOnclickSchedule()}>Tablå</li>
      <li className={styles.listItem} onClick={()=>handleOnclickProgram()}>{singleChannel.name} Program</li>
    </ul>
   )
 }
   
  return (
    <div className={styles.programPage}>
    {singleChannel? renderMenuBar():<h1>Loading...</h1>}
    <Suspense fallback="loading...">
    {showPrograms?< ProgramsByChannelId 
    channelId={channelId}/>:<ChannelSchedule channelId={channelId}/>}
    </Suspense>
    </div>
  )
}

export default ProgramsPage
