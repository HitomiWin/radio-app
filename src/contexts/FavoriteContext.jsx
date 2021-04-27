import { createContext, useState} from "react";
export const FavoriteContext = createContext();

const FavoriteContextProvider=(props)=>{
 const [ favoriteChannels, setFavoriteChannels ]= useState(null);
 const [ favoritePrograms, setFavoritePrograms ] = useState(null);

 const getAllFavoriteChannels= async ()=>{
    let favoriteChannels = await fetch (`/api/v1/favorites/channels`)
    favoriteChannels = await favoriteChannels.json();
    setFavoriteChannels(favoriteChannels)
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
    getAllFavoriteChannels();
    return result
  }
  const addProgramToFavorites = async (programId)=>{
    let result = await fetch (`/api/v1/programs`, {
      mehod:"POST",
      headers:{
        "content-type": "application/json",
      },
      body:JSON.stringfy(programId)
    })
    result = await result.json();
    getAllFavoritePrograms();
    return result
  }
 
  const values ={
   favoriteChannels,
   getAllFavoriteChannels,
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