import { createContext, useState ,useEffect ,useContext} from "react";
import { UserContext } from "./UserContext"
export const FavoriteContext = createContext();

const FavoriteContextProvider=(props)=>{
 const { user }=useContext( UserContext )
 const [ channelIds, setChannelIds ]= useState(null);
 const [ favoriteProgramIds, setFavoriteProgramIds ] = useState(null);
 

 useEffect(() => {
   if(user){
  getAllFavoriteChannelIds()
  getAllFavoriteProgramIds()
   }
 }, [user])

 const getAllFavoriteChannelIds= async ()=>{
    let favoriteChannelIds = await fetch (`/api/v1/favorites/channels`)
    favoriteChannelIds = await favoriteChannelIds.json();
      setChannelIds(favoriteChannelIds)   
  }

  const getAllFavoriteProgramIds = async ()=>{
    let favoritePrograms = await fetch (`/api/v1/favorites/programs`);
    favoritePrograms = await favoritePrograms.json();
    setFavoriteProgramIds(favoritePrograms)
  }

 const addCahnnelToFavorites = async (channelId)=>{
    let result = await fetch (`/api/v1/channels`,{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(channelId),
    });
    result= await result.json();
    getAllFavoriteChannelIds();
    return result
  }

  const addProgramToFavorites = async (programId, channelId)=>{

    let result = await fetch (`/api/v1/programs/${channelId}`, {
      method:"POST",
      headers:{
        "content-type": "application/json",
      },
      body:JSON.stringify(programId)
    })
    result = await result.json();
    getAllFavoriteProgramIds();
    return result
  }
 
  const values ={
   channelIds,
   favoriteProgramIds,
   addCahnnelToFavorites,
   addProgramToFavorites
  }

  return (
    <FavoriteContext.Provider value ={values}>
      {props.children}
    </FavoriteContext.Provider>
  )

}

export default FavoriteContextProvider