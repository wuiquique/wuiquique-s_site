import { Col, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PokemonDashboard() {
  const navigate = useNavigate();

  const generaciones = [
    {
      name: "Primera Generacion",
      imagen: "https://m.media-amazon.com/images/I/71aow5iRsfL.jpg",
      consola: "Game Boy",
      juegos: ["Rojo", "Verde", "Azul", "Amarrillo"],
    },
    {
      name: "Segunda Generacion",
      imagen: "https://m.media-amazon.com/images/I/81UQlso+frL.jpg",
      consola: "Game Boy / Game Boy Color",
      juegos: ["Plata", "Oro", "Cristal"],
    },
    {
      name: "Tercera Generacion",
      imagen: "https://m.media-amazon.com/images/I/7100mueH-uL.jpg",
      consola: "Game Boy Advance",
      juegos: ["Rubi", "Zafiro", "Esmeralda", "Rojo Fuego", "Verde Hoja"],
    },
    {
      name: "Cuarta Generacion",
      imagen: "https://m.media-amazon.com/images/I/71C28eEEaML.jpg",
      consola: "Nintendo DS",
      juegos: ["Diamante", "Perla", "Platino", "HeartGold", "SoulSilver"],
    },
    {
      name: "Quinta Generacion",
      imagen: "https://m.media-amazon.com/images/I/81mLFXTe3ES.jpg",
      consola: "Nintendo DS",
      juegos: ["Negro", "Blanco", "Negro 2", "Blanco 2"],
    },
    {
      name: "Sexta Generacion",
      imagen:
        "https://m.media-amazon.com/images/I/71b8EtHHLeL._AC_UF1000,1000_QL80_.jpg",
      consola: "Nintendo 3DS",
      juegos: ["X", "Y", "Rubi Omega", "Safiro Alfa"],
    },
    {
      name: "Septima Generacion",
      imagen: "https://m.media-amazon.com/images/I/81GOkVv8rOL.jpg",
      consola: "Nintendo 3DS / Nintendo Switch",
      juegos: [
        "Sol",
        "Luna",
        "Ultra Sol",
        "Ultra Luna",
        "Let's Go Pikachu!",
        "Let's Go Eevee!",
      ],
    },
    {
      name: "Octava Generacion",
      imagen:
        "https://storegamesguatemala.com/files/images/productos/1638902513-pokemon-legends-arceus-nintendo-switch-pre-orden.jpg",
      consola: "Nintendo Switch",
      juegos: [
        "Espada",
        "Escudo",
        "Diamante Brillante",
        "Perla Reluciente",
        "Leyendas Arceus!",
      ],
    },
    {
      name: "Novena Generacion",
      imagen:
        "https://m.media-amazon.com/images/M/MV5BNTczOGJjOTUtNzQwMy00ZmU2LTgxOWUtMmRiMjE4MDRhYzgwXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg",
      consola: "Nintendo Switch",
      juegos: ["Escarlata", "Purpura"],
    },
  ];

  return (
    <div>
      <Row>
        {generaciones.map((e, i) => (
          <Col key={i} xs={12} lg={4} className="pt-4">
            <div
              style={{
                backgroundColor: "white",
                border: "solid",
                borderRadius: "10px",
                borderWidth: "1px",
                boxShadow: "5px 5px 15px grey",
                height: "1025px",
                overflow: "hidden",
                position: "relative"
              }}
            >
              <img
                src={e.imagen}
                alt="caratula fav"
                width="100%"
                height="400px"
                style={{ objectFit: "cover" }}
              />
              <div className="text-center mt-4">
                <h3>{e.name}</h3>
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
                <h5>{e.consola}</h5>
              </div>
              {e.juegos.map((juego, index) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
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
                    {index + 1}
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
                    {juego}
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
              ))}
              <button
                onClick={() => navigate(`/pokemon/${i+1}`)}
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
                  bottom: "3%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: "10px",
                }}
                onMouseOver={(e) => e.currentTarget.style.border = "solid"}
                onMouseOut={(e) => e.currentTarget.style.border = "none"}
              >
                <FaSearch />{" "}
                Detalle
              </button>
            </div>
          </Col>
        ))}
      </Row>
      <br />
      <br />
    </div>
  );
}
