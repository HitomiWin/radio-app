import { createContext, useState, useEffect } from "react";

export const ChannelContext = createContext();

const ChannelContextProvider = (props) => {
  const [channels, setChannels] = useState(null);
  useEffect(() => {
    getAllChannels();
    console.log(channels);
  }, []);

  const getAllChannels = async () => {
    let fetchedchannels = await fetch("/api/v1/channels");
    fetchedchannels = await fetchedchannels.json();
    console.log(fetchedchannels);
    if (fetchedchannels) {
      setChannels(fetchedchannels.channels);
    } else {
      console.log("No result");
    }
  };

  const values = {
    channels,
  };

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
