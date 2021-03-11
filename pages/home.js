import Header from '@/components/Header';
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

export default function home() {
  return (
    <>
      <Header />
      <Chat channelName="room-one"></Chat>
    </>
  );
}
