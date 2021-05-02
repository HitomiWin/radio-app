import { createContext, useState, useEffect } from "react";
export const ChannelContext = createContext();

const ChannelContextProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [singleChannel, setSingleChannel] = useState(null);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line
    getAllChannels();
  }, []);

  const getAllChannels = async () => {
    let fetchedchannels = await fetch("/api/v1/channels");
    fetchedchannels = await fetchedchannels.json();
    if (fetchedchannels) {  
      setChannels(fetchedchannels);
    }
  };

  const getChannelById = async (channelId) => {
    let fetchedchannel = await fetch(`/api/v1/channels/${channelId}`);
    fetchedchannel = await fetchedchannel.json();
    if (fetchedchannel) {
      setSingleChannel(fetchedchannel);
    }
  };

  const getChannelSchedule = async (channelId, date) => {
    let fetchedschedule = await fetch(
      `/api/v1/channels/schedule/${channelId}?date=${date}`
    );
    fetchedschedule = await fetchedschedule.json();
    setSchedule(fetchedschedule);
  };

  const values = {
    setChannels,
    channels,
    singleChannel,
    getChannelById,
    schedule,
    getChannelSchedule,
  };

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
