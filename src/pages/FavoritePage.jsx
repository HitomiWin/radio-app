import { useContext, useEffect } from  "react" ;
import {FavoriteContext} from "../contexts/FavoriteContext";

const FavoritePage =()=>{
 
const { favoriteChannels,
    getAllFavoriteChannels,
    addCahnnelToFavorites,
    favoritePrograms,
    getAllFavoritePrograms,
    addProgramToFavorites} =useContext( FavoriteContext );

    // userEffect(()=>{

    // },[])

  return(
    <div></div>
  )
}
export default FavoritePage