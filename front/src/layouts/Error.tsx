import { useRouteError } from "react-router-dom";
import Bg1 from "../assets/wave.svg";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <img
        src={Bg1}
        style={{
          width: "2500px",
          position: "absolute",
          right: "-2%"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="text-center"
      >
        <img
          width="250px"
          src="https://www.svg.com/img/gallery/pokmon-go-devs-made-fun-of-upset-fanbase-players-in-a-now-deleted-tweet/intro-1682684414.jpg"
        />
        <h1>Oops...</h1>
        <h3>Error found! What did you do? {">:|"}</h3>
      </div>
    </div>
  );
}
