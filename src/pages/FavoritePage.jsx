import { useContext, useEffect } from  "react" ;
import {FavoriteContext} from "../contexts/FavoriteContext";
import styles from "../css/ProgramsPage.module.css"

const FavoritePage =()=>{
 
const { favoriteChannels,
    getAllFavoriteChannels,
    addCahnnelToFavorites,
    favoritePrograms,
    getAllFavoritePrograms,
    addProgramToFavorites} =useContext( FavoriteContext );

    const handleOnclickChannels=()=>{
      console.log("hej channel")
    }
    const handleOnclickPrograms=()=>{
      console.log("hej program")
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
    </div>
  )
}
export default FavoritePage