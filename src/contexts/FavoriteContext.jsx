import { createContext, useState ,useEffect ,useContext} from "react";
import {ChannelContext } from "./ChannelContext"
import { UserContext } from "./UserContext"
export const FavoriteContext = createContext();

const FavoriteContextProvider=(props)=>{
  const { channels } =useContext( ChannelContext );
  const { user }=useContext( UserContext )
 const [ channelIds, setChannelIds ]= useState(null);
 const [ favoritePrograms, setFavoritePrograms ] = useState(null);
 

 useEffect(() => {
  getAllFavoriteChannelIds()
 }, [user])

 const getAllFavoriteChannelIds= async ()=>{
    let favoriteChannelIds = await fetch (`/api/v1/favorites/channels`)
    favoriteChannelIds = await favoriteChannelIds.json();
    setChannelIds(favoriteChannelIds)
  }

  const getAllFavoritePrograms = async ()=>{
    let favoritePrograms = await fetch (`/api/v1/favorites/programs`);
    favoritePrograms = await favoritePrograms.json();
    setFavoritePrograms(favoritePrograms)
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
    getAllFavoritePrograms();
    return result
  }
 
  const values ={
   channelIds,
   getAllFavoriteChannelIds,
   addCahnnelToFavorites,
   favoritePrograms,
   getAllFavoritePrograms,
   addProgramToFavorites
  }

  return (
    <FavoriteContext.Provider value ={values}>
      {props.children}
    </FavoriteContext.Provider>
  )

}

export default FavoriteContextProvider