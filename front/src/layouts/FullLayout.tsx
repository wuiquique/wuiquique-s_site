import { Container, Nav, Navbar } from "react-bootstrap";
import Bg1 from "../assets/wave.svg";
import { Outlet } from "react-router-dom";

export default function FullLayout() {
  return (
    <>
      <img
        src={Bg1}
        style={{
          width: "2500px",
          position: "fixed",
          right: "-2%",
          zIndex: "-1",
        }}
      />
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <img
              src="https://i.pinimg.com/736x/05/44/4d/05444d5b731842366a49f9aca24a4aab.jpg"
              width="50px"
              style={{ borderRadius: "50%" }}
            />{" "}
            wuiquique
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/spotify">Spotify</Nav.Link>
              <Nav.Link href="/pokemon">Pokemon</Nav.Link>
              <Nav.Link href="#valorant">Valorant</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
