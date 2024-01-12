import Player from "@/components/Player";
import { useSocket } from "@/context/socket";
import useMediaStreams from "@/hooks/useMediaStreams";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import { useEffect } from "react";

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStreams();
  const { players, setPlayers } = usePlayer();

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`New User is connected : ${newUser}`);
      const call = peer?.call(newUser, stream);

      call?.on("stream", (incomingStream) => {
        console.log(`incoming Stream from : ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream, setPlayers]);

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on("call", (call) => {
      const { peer: calledId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream : ${calledId}`);
        setPlayers((prev) => ({
          ...prev,
          [calledId]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
      });
    });
  }, [peer, stream, setPlayers]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`Setting my stream : ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [stream, myId, setPlayers]);

  return (
    <div>
      {Object.keys(players).map((playerId) => {
        const { url, muted, playing } = players[playerId];
        return (
          <Player key={playerId} url={url} muted={muted} playing={playing} />
        );
      })}
    </div>
  );
};

export default Room;
