import Player from "@/components/Player";
import { useSocket } from "@/context/socket";
import useMediaStreams from "@/hooks/useMediaStreams";
import usePeer from "@/hooks/usePeer";

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStreams();
  return (
    <div>
      <Player playerId={myId} url={stream} muted playing />
    </div>
  );
};

export default Room;
