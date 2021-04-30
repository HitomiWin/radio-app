import { createContext, useState ,useEffect ,useContext} from "react";
import { UserContext } from "./UserContext"
export const FavoriteContext = createContext();

const FavoriteContextProvider=(props)=>{
 const { user }=useContext( UserContext )
 const [ favoriteChannelIds, setFavoriteChannelIds ]= useState(null);
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
      setFavoriteChannelIds(favoriteChannelIds)   
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

  const deleteFavoriteChannel =async ( channelId )=>{
    console.log(channelId)
      await fetch(`/api/v1/favorites/channels/${channelId}`,{
      method:"DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
    setFavoriteChannelIds(favoriteChannelIds.filter((ch)=> channelId !==ch.channelId))
  }
 
  const deleteFavoriteProgram =async ( programId )=>{
      await fetch(`/api/v1/favorites/programs/${programId}`,{
      method:"DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
    
    setFavoriteProgramIds(favoriteProgramIds.filter((p)=> programId !==p.programId));

  }
 
  const values ={
   favoriteChannelIds,
   favoriteProgramIds,
   addCahnnelToFavorites,
   addProgramToFavorites,
   deleteFavoriteChannel,
   deleteFavoriteProgram
  }

  return (
    <FavoriteContext.Provider value ={values}>
      {props.children}
    </FavoriteContext.Provider>
  )

}

export default FavoriteContextProvider