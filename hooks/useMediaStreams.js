const { useState, useEffect, useRef } = require("react");

const useMediaStreams = () => {
  const [state, setState] = useState(null);

  const isStream = useRef(false);

  useEffect(() => {
    if (isStream.current) return;
    isStream.current = true;
    (async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { width: 1280, height: 720 },
        });
        console.log("Setting your stream");
        setState(stream);
      } catch (error) {
        console.log("Error in Navigator..", error);
      }
    })();
  }, []);

  return {
    stream: state,
  };
};

export default useMediaStreams;
