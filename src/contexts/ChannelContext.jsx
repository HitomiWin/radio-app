import { createContext, useState, useEffect } from "react";

export const ChannelContext = createContext();

const ChannelContextProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [singleChannel, setSingleChannel] = useState(null);
  useEffect(() => {
    getAllChannels();
  }, []);

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    if (channels) {
      setChannels(channels.channels);
    } else {
      console.log("No result");
    }
  };
  const getChannelById = async (channelId)=>{
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    setSingleChannel(channel.channel)
  }

  const values = {
    channels,
    singleChannel,
    getChannelById
  };

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
