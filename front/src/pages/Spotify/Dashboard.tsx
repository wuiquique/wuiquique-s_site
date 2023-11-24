import axios from "axios";
import { useEffect, useState } from "react";
import { keys } from "../../keys.ts";
import { Col, Row } from "react-bootstrap";
import { environmentSpotify } from "../../environment.ts";
import { BsPeople } from "react-icons/bs";
import { MdOutlinePublic } from "react-icons/md";

export default function SpotifyDashboard() {
  const [playlistURL, setPlaylistURL] = useState("");
  const [playlistData, setPlaylistData] = useState({
    name: "",
    images: [{ url: "" }],
    description: "",
    collaborative: false,
    public: false,
    owner: { display_name: "" },
  });
  const [canciones, setCanciones] = useState<
    {
      track: { id: string; name: string; artists: Array<{ name: string }> };
      features: {
        acousticness: number;
        danceability: number;
        duration_ms: number;
        energy: number;
        instrumentalness: number;
        key: number;
        liveness: number;
        loudness: number;
        mode: number;
        speechiness: number;
        tempo: number;
        time_signature: number;
        valence: number;
      };
    }[]
  >([]);
  const [idsCanciones, setIdsCanciones] = useState<Object[]>([]);
  const [showCanciones, setShowCanciones] = useState<boolean>(false);

  const getAuth = async () => {
    try {
      const configAuth = {
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: {
          grant_type: "client_credentials",
          client_id: keys.client_id,
          client_secret: keys.client_secret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const response = await axios(configAuth);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleSearch = async () => {
    try {
      const auth = await getAuth();

      if (!auth) {
        console.error("Error al obtener la autorización");
        return;
      }

      let id = playlistURL.split("/")[4].split("?")[0];
      console.log(playlistURL.split("/")[4].split("?")[0]);
      const config = {
        method: "get",
        url: "https://api.spotify.com/v1/playlists/" + id,
        headers: {
          Authorization: "Bearer " + auth.access_token,
        },
      };

      const response = await axios(config);
      setPlaylistData(response.data);
      setCanciones(response.data.tracks.items);

      let temp = [];
      for (let o of response.data.tracks.items) {
        temp.push(o.track.id);
      }
      setIdsCanciones(temp);
      setShowCanciones(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSongs = async () => {
    try {
      const auth = await getAuth();

      if (!auth) {
        console.error("Error al obtener la autorizacion");
        return;
      }

      let ids = idsCanciones.join(",");
      const configMetadata = {
        method: "post",
        url: environmentSpotify.urlApi + "/songs-features",
        data: {
          ids: ids,
          auth: auth,
        },
      };

      const response = await axios(configMetadata);
      let temp = [...canciones];
      for (let f of temp) {
        let producto = response.data?.audio_features.find(
          (c: any) => c.id === f.track.id
        );
        f.features = producto;
      }
      setCanciones(temp);
      setShowCanciones(true);
      console.log(temp);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          border: "solid",
          borderRadius: "10px",
          borderWidth: "1px",
          boxShadow: "5px 5px 15px grey",
          height: "200px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <br />
        <div
          className="text-center m-auto"
          style={{
            width: "80%",
            backgroundColor: "#5C8374",
            color: "white",
            borderRadius: "10px",
          }}
        >
          Playlist URL
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            style={{
              width: "80%",
              appearance: "none",
              border: "none",
              outline: "none",
              borderBottom: ".2em solid #183D3D",
              background: "#93B1A6",
              borderRadius: ".2em .2em 0 0",
              padding: ".4em",
              color: "#040D12",
            }}
            value={playlistURL}
            onChange={(ev) => setPlaylistURL(ev.currentTarget.value)}
          />
        </div>
        <br />
        <button
          type="button"
          style={{
            backgroundColor: "#183D3D",
            color: "white",
            border: "none",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "64px",
            paddingRight: "64px",
            textDecoration: "none",
            fontSize: "16px",
            margin: "0 auto",
            display: "block",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "10px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.border = "solid")}
          onMouseOut={(e) => (e.currentTarget.style.border = "none")}
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <br />
      {playlistData.name && (
        <div
          style={{
            backgroundColor: "white",
            border: "solid",
            borderRadius: "10px",
            borderWidth: "1px",
            boxShadow: "5px 5px 15px grey",
            // height: "2000px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Row>
            <Col
              xs={12}
              md={6}
              lg={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={playlistData.images[0].url}
                alt="Playlist Img"
                width="60%"
              />
            </Col>
            <Col xs={12} md={6} lg={8}>
              <br />
              <h2>{playlistData.name}</h2>
              {playlistData.description && <h6>{playlistData.description}</h6>}

              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ margin: "0" }}>
                  <b>By:</b>
                </p>
                <div
                  className="text-center"
                  style={{
                    marginLeft: "10px",
                    width: "50%",
                    backgroundColor: "#5C8374",
                    color: "white",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                >
                  {playlistData.owner.display_name}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div
                  style={{
                    backgroundColor: "white",
                    marginTop: "15px",
                    width: "50px",
                    height: "50px",
                    border: "solid",
                    borderColor: "grey",
                    borderWidth: "0.1px",
                    borderRadius: "5px",
                    boxShadow: "1px 1px 5px grey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                    color: "white",
                    textShadow:
                      "-1px 1px 0px #183D3D, 1px 1px 0px #183D3D, 1px -1px 0px #183D3D, -1px -1px 0px #183D3D",
                    zIndex: "4",
                  }}
                >
                  <BsPeople style={{ color: "#040D12" }} />
                </div>
                <div
                  style={{
                    backgroundColor: "#93B1A6",
                    width: "80%",
                    height: "50px",
                    marginTop: "22px",
                    marginLeft: "-10px",
                    color: "white",
                    paddingLeft: "20px",
                    paddingTop: "10px",
                    zIndex: "2",
                    position: "relative",
                  }}
                >
                  {playlistData.collaborative
                    ? "Colaborativa"
                    : "No Colaborativa"}
                  <div
                    style={{
                      content: "",
                      position: "absolute",
                      top: 0,
                      right: "-10px",
                      width: "0",
                      height: "0",
                      borderTop: "25px solid transparent",
                      borderBottom: "25px solid transparent",
                      borderLeft: "10px solid #93B1A6",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    backgroundColor: "white",
                    marginTop: "15px",
                    width: "50px",
                    height: "50px",
                    border: "solid",
                    borderColor: "grey",
                    borderWidth: "0.1px",
                    borderRadius: "5px",
                    boxShadow: "1px 1px 5px grey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                    color: "white",
                    textShadow:
                      "-1px 1px 0px #183D3D, 1px 1px 0px #183D3D, 1px -1px 0px #183D3D, -1px -1px 0px #183D3D",
                    zIndex: "4",
                  }}
                >
                  <MdOutlinePublic style={{ color: "#040D12" }} />
                </div>
                <div
                  style={{
                    backgroundColor: "#93B1A6",
                    width: "80%",
                    height: "50px",
                    marginTop: "22px",
                    marginLeft: "-10px",
                    color: "white",
                    paddingLeft: "20px",
                    paddingTop: "10px",
                    zIndex: "2",
                    position: "relative",
                  }}
                >
                  {playlistData.public ? "Publica" : "Privada"}
                  <div
                    style={{
                      content: "",
                      position: "absolute",
                      top: 0,
                      right: "-10px",
                      width: "0",
                      height: "0",
                      borderTop: "25px solid transparent",
                      borderBottom: "25px solid transparent",
                      borderLeft: "10px solid #93B1A6",
                    }}
                  ></div>
                </div>
              </div>
              <br />
            </Col>
          </Row>
          <button
            type="button"
            style={{
              backgroundColor: "#183D3D",
              color: "white",
              border: "none",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "64px",
              paddingRight: "64px",
              textDecoration: "none",
              fontSize: "16px",
              margin: "0 auto",
              display: "block",
              borderRadius: "10px",
            }}
            onClick={handleSongs}
          >
            Ver Canciones
          </button>
          <br />
        </div>
      )}
      <br />
      {showCanciones && (
        <Row>
          {canciones.map((e, i) => (
            <Col xs={12} md={6} lg={4} key={i} className="pt-4">
              <div
                style={{
                  backgroundColor: "white",
                  border: "solid",
                  borderRadius: "10px",
                  borderWidth: "1px",
                  boxShadow: "5px 5px 15px grey",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div className="text-center mt-4">
                  <h3>{e.track.name}</h3>
                </div>
                <div
                  className="text-center m-auto"
                  style={{
                    width: "80%",
                    backgroundColor: "#5C8374",
                    color: "white",
                    borderRadius: "10px",
                  }}
                >
                  <h5>{e.track.artists[0].name}</h5>
                </div>
                <div>
                  <ul>
                    <li>
                      Acousticness: {(e.features.acousticness * 100).toFixed(2)}
                      %
                    </li>
                    <li>
                      Danceability: {(e.features.danceability * 100).toFixed(2)}
                      %
                    </li>
                    <li>Duration: {e.features.duration_ms}ms</li>
                    <li>Energy: {(e.features.energy * 100).toFixed(2)}%</li>
                    <li>
                      Instrumentalness:{" "}
                      {(e.features.instrumentalness * 100).toFixed(2)}%
                    </li>
                    <li>
                      Key:{" "}
                      {e.features.key === 0
                        ? "C"
                        : e.features.key === 1
                        ? "C#"
                        : e.features.key === 2
                        ? "D"
                        : e.features.key === 3
                        ? "D#"
                        : e.features.key === 4
                        ? "E"
                        : e.features.key === 5
                        ? "F"
                        : e.features.key === 6
                        ? "F#"
                        : e.features.key === 7
                        ? "G"
                        : e.features.key === 8
                        ? "G#"
                        : e.features.key === 9
                        ? "A"
                        : e.features.key === 10
                        ? "A#"
                        : e.features.key === 11
                        ? "B"
                        : "Key not detected"}
                    </li>
                    <li>Liveness: {(e.features.liveness * 100).toFixed(2)}%</li>
                    <li>Loudness: {e.features.loudness}db</li>
                    <li>Mode: {e.features.mode === 1 ? "Major" : "Minor"}</li>
                    <li>
                      Speechiness: {(e.features.speechiness * 100).toFixed(2)}%
                    </li>
                    <li>Tempo: {e.features.tempo.toFixed(0)}bpm</li>
                    <li>Time Signature: {e.features.time_signature}/4</li>
                    <li>Valence: {(e.features.valence * 100).toFixed(2)}%</li>
                  </ul>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
      <br />
    </div>
  );
}
