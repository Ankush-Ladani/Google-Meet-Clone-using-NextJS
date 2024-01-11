import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/home.module.css";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`);
    else {
      alert("Please provide a valid Room Id");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Google Meet Clone</h1>
      <div className={styles.enterRoom}>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e?.target?.value)}
          placeholder="Enter RoomID"
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <span className={styles.separatorText}>
        -------------- OR -----------------
      </span>

      <button onClick={createAndJoin}>Create a New Room</button>
    </div>
  );
}
