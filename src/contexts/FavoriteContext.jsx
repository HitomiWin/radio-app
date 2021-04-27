import { createContext, useState} from "react";
export const FavoriteContext = createContext();

const FavoriteContextProvider=(props)=>{
 const [ favoriteChannels, setFavoriteChannels ]= useState(null);

 const getAllFavoriteChannels= async ()=>{
    let favoriteChannels = await fetch (`/api/v1/favorites/channels`)
    favoriteChannels = await favoriteChannels.json();
    console.log(favoriteChannels)
    setFavoriteChannels(favoriteChannels)
  }
 console.log(favoriteChannels)
 const addCahnnelToFavoriter = async (channelId)=>{
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
 
  const values ={
   favoriteChannels,
   getAllFavoriteChannels,
   addCahnnelToFavoriter
  }

  return (
    <FavoriteContext.Provider value ={values}>
      {props.children}
    </FavoriteContext.Provider>
  )

}

export default FavoriteContextProvider