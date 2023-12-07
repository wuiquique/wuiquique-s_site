import axios from "axios";
import { useState } from "react";
import { keys } from "../keys";
import { Col, Row } from "react-bootstrap";
import { environmentSpotify } from "../environment";
import { BsPeople } from "react-icons/bs";
import { MdOutlineDateRange, MdAccessTime } from "react-icons/md";

export default function MainDashboard() {
  const [track, setTrack] = useState<any>({});
  const [feat, setFeat] = useState<any>({});
  const [url, setUrl] = useState("");
  const [predict, setPredict] = useState<any>({});

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

  const Search = async () => {
    try {
      const auth = await getAuth();

      if (!auth) {
        console.error("Error al obtener la autorización");
        return;
      }

      let id = url.split("/")[5].split("?")[0];

      const config = {
        method: "get",
        url: "https://api.spotify.com/v1/tracks/" + id,
        headers: {
          Authorization: "Bearer " + auth.access_token,
        },
      };

      const responseTrack = await axios(config);
      setTrack(responseTrack.data);
      //   console.log(responseTrack.data);

      const configFeat = {
        method: "get",
        url: "https://api.spotify.com/v1/audio-features/" + id,
        headers: {
          Authorization: "Bearer " + auth.access_token,
        },
      };

      const responseFeat = await axios(configFeat);
      setFeat(responseFeat.data);
      setPredict({})
      //   console.log(responseFeat.data);
    } catch (err) {
      console.error(err);
    }
  };

  const Popularity = async () => {
    try {
      const config = {
        method: "post",
        url: environmentSpotify.urlModel + `/predict`,
        data: {
          song_duration_ms: feat.duration_ms,
          acousticness: feat.acousticness,
          danceability: feat.danceability,
          energy: feat.energy,
          instrumentalness: feat.instrumentalness,
          key: feat.key,
          liveness: feat.liveness,
          loudness: feat.loudness,
          audio_mode: feat.mode,
          speechiness: feat.speechiness,
          tempo: feat.tempo,
          time_signature: feat.time_signature,
          audio_valence: feat.valence,
        },
      };

      const response = await axios(config);
      setPredict(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
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
          Track Spotify URL
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
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
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
          onClick={Search}
        >
          Search
        </button>
      </div>
      <br />
      {track.name && feat.energy ? (
        <div
          style={{
            backgroundColor: "white",
            border: "solid",
            borderRadius: "10px",
            borderWidth: "1px",
            boxShadow: "5px 5px 15px grey",
            //   height: "200px",
            overflow: "hidden",
            position: "relative",
            padding: "5px",
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
                src={track?.album?.images[0].url}
                alt="Album Cover"
                width="100%"
              />
            </Col>
            <Col xs={12} md={6} lg={8}>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>{track.name}</h2>
                <div
                  style={{
                    background: "#5C8374",
                    borderRadius: "10px",
                    width: "200px",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    marginRight: "15px",
                  }}
                >
                  {track?.album?.name}
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
                  {track?.artists?.map((artist: any, index: number) => {
                    return (
                      <span key={index}>
                        {artist.name}
                        {index !== track.artists.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
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
                  <MdOutlineDateRange style={{ color: "#040D12" }} />
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
                  {track?.album?.release_date}
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
                  <MdAccessTime style={{ color: "#040D12" }} />
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
                  {Math.floor(Math.floor(track.duration_ms / 1000) / 60) +
                    "min " +
                    Math.floor((track.duration_ms / 1000) % 60) +
                    "sec"}
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
            onClick={Popularity}
          >
            Check Popularity
          </button>
        </div>
      ) : (
        <></>
      )}
      <br />
      {predict.prediction && (
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
          <Row>
            <Col xs={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "#93B1A6",
                    width: "200px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "25px",
                  }}
                >
                  <h2>Real</h2>
                </div>
              </div>
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1>{track.popularity}%</h1>
              </div>
            </Col>
            <Col xs={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "#183D3D",
                    width: "200px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "25px",
                  }}
                >
                  <h2>Modelo</h2>
                </div>
              </div>
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1>{predict.prediction}%</h1>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
