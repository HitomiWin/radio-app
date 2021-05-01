import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
export const FavoriteContext = createContext();

const FavoriteContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [favoriteChannelIds, setFavoriteChannelIds] = useState(null);
  const [favoriteProgramIds, setFavoriteProgramIds] = useState(null);
  const [showSchedule, setShowSchedule] = useState(null);

  useEffect(() => {
    if (user) {
      getAllFavoriteChannelIds();
      getAllFavoriteProgramIds();
    }
  }, [user]);

  const getAllFavoriteChannelIds = async () => {
    let favoriteChannelIds = await fetch(`/api/v1/favorites/channels`);
    favoriteChannelIds = await favoriteChannelIds.json();
    setFavoriteChannelIds(favoriteChannelIds);
  };

  const getAllFavoriteProgramIds = async () => {
    let favoritePrograms = await fetch(`/api/v1/favorites/programs`);
    favoritePrograms = await favoritePrograms.json();
    setFavoriteProgramIds(favoritePrograms);
  };

  const addChannelToFavorites = async (channelId) => {
    let result = await fetch(`/api/v1/channels`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(channelId),
    });
    result = await result.json();
    await getAllFavoriteChannelIds();
    return result;
  };

  const addProgramToFavorites = async (programId, channelId) => {
    let result = await fetch(`/api/v1/programs/${channelId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(programId),
    });
    result = await result.json();
    getAllFavoriteProgramIds();
    return result;
  };

  const deleteFavoriteChannel = async (e, channelId) => {
    e.stopPropagation();
    let result = await fetch(`/api/v1/favorites/channels/${channelId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    setFavoriteChannelIds(
      favoriteChannelIds.filter((ch) => channelId !== ch.channelId)
    );
    if (result.success) {
      console.log(result.success);
    } else {
      console.log(result.error);
    }
  };

  const deleteFavoriteProgram = async (e, programId) => {
    e.stopPropagation();
    let result = await fetch(`/api/v1/favorites/programs/${programId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    setFavoriteProgramIds(
      favoriteProgramIds.filter((p) => programId !== p.programId)
    );
    if (result.success) {
      console.log(result.success);
    } else {
      console.log(result.error);
    }
  };

  const values = {
    favoriteChannelIds,
    favoriteProgramIds,
    addChannelToFavorites,
    addProgramToFavorites,
    deleteFavoriteChannel,
    deleteFavoriteProgram,
    showSchedule,
    setShowSchedule,
  };

  return (
    <FavoriteContext.Provider value={values}>
      {props.children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
