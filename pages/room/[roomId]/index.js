import { useParams } from "next/navigation";

const Room = () => {
  const params = useParams();
  return <div>Room : {params?.roomId} </div>;
};

export default Room;
