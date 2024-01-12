import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";

const { useEffect, useRef, useState } = require("react");

const usePeer = () => {
  const [peer, setPeer] = useState(null);
  const [myId, setmyId] = useState(null);
  const socket = useSocket();
  const roomId = useRouter().query.roomId;

  const isPeer = useRef(false);

  useEffect(() => {
    if (isPeer.current || !socket || !roomId) return;
    isPeer.current = true;
    let myPeer;
    (async function initPeer() {
      myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);

      myPeer?.on("open", (id) => {
        console.log(`Peer id : ${id}`);
        setmyId(id);
        socket?.emit("join-room", roomId, id);
      });
    })();
  }, [roomId, socket]);

  return {
    peer,
    myId,
  };
};

export default usePeer;
