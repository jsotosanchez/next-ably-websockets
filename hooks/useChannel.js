import Ably from 'ably/promises';
import { useEffect } from 'react';
import { ABLY_NEW_MESSAGE } from '../constants';
const ably = new Ably.Realtime.Promise({ authUrl: '/api/createAblyToken' });

export function useChannel(channelName, callbackOnMessage) {
  const channel = ably.channels.get(channelName);

  const onMount = () => {
    console.log('mounting component');

    channel.subscribe(ABLY_NEW_MESSAGE, (msg) => {
      callbackOnMessage(msg);
    });
  };

  const onUnmount = () => {
    channel.unsubscribe();
  };

  const useEffectHook = () => {
    onMount();
    return () => {
      onUnmount();
    };
  };

  useEffect(useEffectHook);

  return [channel, ably];
}
