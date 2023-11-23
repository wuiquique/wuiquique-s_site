const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();
const PORT = 3030;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.post("/songs-features", async (req, res) => {
  try {
    const { ids, auth } = req.body;
    const configMetadata = {
      method: "get",
      url: "https://api.spotify.com/v1/audio-features?ids=" + ids,
      headers: {
        Authorization: "Bearer " + auth.access_token,
      },
    };
    console.log("Analysis Started")
    const response = await axios(configMetadata);
    res.json(response.data)
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Hubo un problema al obtener los datos de Spotify" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
