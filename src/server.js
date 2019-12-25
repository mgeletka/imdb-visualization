const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');


const port = 3003;
const app = express();
const omdbUrl = " http://www.omdbapi.com";
// const apiKey = "3116896e";

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.get('/get_movie_detail',(request, response) => {
    // eslint-disable-next-line no-console
    console.log(request);
    let status = 200;

    axios.get(`${omdbUrl}/?i=${request.query.imdb_id}&apikey=3116896e`, {})
      .then(function (omdbResponse) {
        if (omdbResponse.status !== 200) {
          status = omdbResponse.status;
        } else {
          // eslint-disable-next-line no-console
          console.log(omdbResponse);
          response = omdbResponse;
        }
      })
      .catch(function () {
        response = { responseText: "Cannot send voice print" };
      });

    response.status(status).json({status: response});
  }
);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`IMDB visualization listening on  ${port}`));



app.use(express.static('./dist', {
  lastModified: true,
}));

