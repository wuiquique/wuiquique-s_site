import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";

export default function PokemonDashboard() {
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
      consola: "Nintendo 3DS y Nintendo Switch",
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
            <Card style={{ height: "750px" }}>
              <Card.Img
                variant="top"
                src={e.imagen}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{e.name}</Card.Title>
                <Card.Subtitle>{e.consola}</Card.Subtitle>
                <Card.Text>
                  <ListGroup>
                    {e.juegos.map((juego, index) => (
                      <ListGroup.Item key={index}>{juego}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Text>
                <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
                  <Button variant="outline-primary">Detalles</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
