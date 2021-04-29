import { useContext, useEffect ,useState } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { ChannelContext } from "../contexts/ChannelContext";


function FavoriteChannels(props) {
  const { channelIds } = useContext( FavoriteContext );
  const { channels } = useContext( ChannelContext );
  const [favoriteChannels, setFavoriteChannels ] = useState(null)
  useEffect(() => {
    getChannelsByFavoriteChannelIds();
    console.log(channelIds)
    console.log(channels)
  }, [channelIds])
  const getChannelsByFavoriteChannelIds=()=>{
    let result = channels.filter((c)=>(
      channelIds.find((ci)=>(
        c.id===ci.channelId
      ))
    ))
    setFavoriteChannels(result)
  }
  console.log(favoriteChannels)
  return (
    <div>
    <h1>
      this is FavoriteChannels
    </h1>
      {favoriteChannels? favoriteChannels.map((f)=>(<div key={f.id}>{f.id} </div>)

      ) : <p>No Favorite Channels</p>}
    </div> 

  );
}

export default FavoriteChannels;