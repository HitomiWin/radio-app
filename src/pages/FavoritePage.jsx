import React, { Suspense ,useState, useContext,useEffect} from "react"
import {FavoriteContext} from "../contexts/FavoriteContext";
import FavoritePrograms from "../components/FavoritePrograms"
import { Spinner }from "react-bootstrap"
import styles from "../css/ProgramsPage.module.css"
const  FavoriteChannels = React.lazy(()=>import("../components/FavoriteChannels"));

const FavoritePage =()=>{
    const [ showChannels, setShowChannels]=useState(null)
    const { setShowSchedule }=useContext(FavoriteContext)

    useEffect(()=>{
      setShowChannels(true)
    },[])

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
         <li className={`${styles.favoriteListItem} ${showChannels? styles.inactive : styles.active}`} onClick={()=>handleOnclickChannels()}>Mina Kanaler</li>
         <li className={`${styles.favoriteListItem
         } ${showChannels ? styles.active : styles.inactive}`} onClick={()=>handleOnclickPrograms()}>Mina Program</li>
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