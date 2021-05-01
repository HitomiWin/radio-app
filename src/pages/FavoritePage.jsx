import React, { Suspense ,useState, useContext } from "react"
import {FavoriteContext} from "../contexts/FavoriteContext";
import FavoritePrograms from "../components/FavoritePrograms"
import { Spinner }from "react-bootstrap"
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
      <Suspense
        className="text-center"
        fallback={<Spinner animation="border" variant="secondary" />}
      >
      {renderMenuBar()}
      {showChannels?< FavoriteChannels />:<FavoritePrograms />}
      </Suspense>
    </div>
  )
}
export default FavoritePage