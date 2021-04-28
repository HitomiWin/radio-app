import { useState } from  "react" ;
import {FavoriteContext} from "../contexts/FavoriteContext";
import FavoriteChannels from "../components/FavoriteChannels"
import FavoritePrograms from "../components/FavoritePrograms"
import styles from "../css/ProgramsPage.module.css"

const FavoritePage =()=>{
    const [ showChannels, setShowChannels]=useState(true)

    const handleOnclickChannels=()=>{
      setShowChannels(true)
    }
    const handleOnclickPrograms=()=>{
      setShowChannels(false)
    }
    

    const renderMenuBar=()=>{
      return (   
       <ul className={styles.menuList} >
         <li className={styles.listItem} onClick={()=>handleOnclickChannels()}>Mina Kanaler</li>
         <li className={styles.listItem} onClick={()=>handleOnclickPrograms()}>Mina Programs</li>
       </ul>
      )
    }

  return(
    <div >
      {renderMenuBar()}
      {showChannels?< FavoriteChannels />:<FavoritePrograms />}
    </div>
  )
}
export default FavoritePage