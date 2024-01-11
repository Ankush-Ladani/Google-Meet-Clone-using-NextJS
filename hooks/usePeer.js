const { useEffect, useRef, useState } = require("react");

const usePeer = () => {
  const [peer, setPeer] = useState(null);
  const [myId, setmyId] = useState(null);

  const isPeer = useRef(false);

  useEffect(() => {
    if (isPeer.current) return;
    isPeer.current = true;
    let myPeer;
    (async function initPeer() {
      myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);

      myPeer?.on("open", (id) => {
        setmyId(id);
      });
    })();
  }, []);

  return {
    peer,
    myId,
  };
};

export default usePeer;
