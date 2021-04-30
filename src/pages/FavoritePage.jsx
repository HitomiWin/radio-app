import React, { Suspense ,useState, useContext } from "react"
import {FavoriteContext} from "../contexts/FavoriteContext";
// import FavoriteChannels from "../components/FavoriteChannels"
import FavoritePrograms from "../components/FavoritePrograms"
import styles from "../css/ProgramsPage.module.css"
const  FavoriteChannels = React.lazy(()=>import("../components/FavoriteChannels"));

const FavoritePage =()=>{
    const [ showChannels, setShowChannels]=useState(true)
    const { showSchedule, setShowSchedule }=useContext(FavoriteContext)

    const handleOnclickChannels=()=>{
      setShowChannels(true)
      setShowSchedule(false)
    }
    const handleOnclickPrograms=()=>{
      setShowChannels(false)
    }
    

    const renderMenuBar=()=>{
      return (   
       <ul className={styles.favoriteMenuList} >
         <li className={styles.favoriteListItem} onClick={()=>handleOnclickChannels()}>Mina Kanaler</li>
         <li className={styles.favoriteListItem} onClick={()=>handleOnclickPrograms()}>Mina Programs</li>
       </ul>
      )
    }

  return(
    <div >
      <Suspense fallback="loading...">
      {renderMenuBar()}
      {showChannels?< FavoriteChannels />:<FavoritePrograms />}
      </Suspense>
    </div>
  )
}
export default FavoritePage