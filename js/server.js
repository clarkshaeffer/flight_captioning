const express = require('express');
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await axios.post('https://api.assemblyai.com/v2/realtime/token', // use account token to get a temp user token
      { expires_in: 3600 }, // can set a TTL timer in seconds.
      { headers: { authorization: '0f7f40275cb4488fb51a509b9ebfeb7c' } }); // token
    const { data } = response;
    res.json(data);
  } catch (error) {
    res.json(`Error: ${error}`);
  }
});

app.set('port', PORT);
const server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${server.address().port}`);
});
