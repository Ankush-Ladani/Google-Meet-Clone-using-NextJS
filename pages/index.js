import { useSocket } from "@/context/socket";
import { useEffect } from "react";

export default function Home() {
  const socket = useSocket();

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket?.id); // x8WIv7-mJelg7on_ALbx
    });
  }, [socket]);

  return <h1>Hello NextJS</h1>;
}
