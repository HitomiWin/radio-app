import { createContext, useState, useEffect } from "react";

export const ChannelContext = createContext();

const ChannelContextProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [singleChannel, setSingleChannel] = useState(null);
  const [schedule, setSchedule] = useState(null);
  
  useEffect(() => {
    getAllChannels();
  }, []);

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    if (channels) {
      setChannels(channels);
    } else {
      console.log("No result");
    }
  };
  const getChannelById = async (channelId)=>{
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    setSingleChannel(channel.channel)
  }

  const  getChannelSchedule= async (channelId,date)=>{
    let schedule = await fetch (`/api/v1/channels/schedule/${channelId}?date=${date}`);
    schedule = await schedule.json();
    setSchedule(schedule);
  }

  const values = {
    channels,
    singleChannel,
    getChannelById,
    schedule,
    getChannelSchedule
  };

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
