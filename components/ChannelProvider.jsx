import React, { useState, useContext, createContext } from 'react';

const channelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const channel = useProvideChannel();
  return <channelContext.Provider value={channel}>{children} </channelContext.Provider>;
};

export const useChannelContext = () => {
  return useContext(channelContext);
};

const useProvideChannel = () => {
  const [channel, setChannel] = useState('');

  return { channel, setChannel };
};
