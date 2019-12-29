const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');


const port = process.env.PORT || 3003;
const app = express();
const omdbUrl = " http://www.omdbapi.com";
// const apiKey = "3116896e";

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.set('json spaces', 40);


app.get('/get_movie_detail',(request, response) => {

    let status = 200;

    axios.get(`${omdbUrl}/?i=${request.query.imdb_id}&apikey=3116896e`, {})
      .then(function (omdbResponse) {
        // eslint-disable-next-line no-console
        console.log(omdbResponse.data);
          status = omdbResponse.status;
          response.status(status).json({movieDetail: omdbResponse.data});

      })
      .catch(function () {
        response.status(500).json({movieDetail: {}});
      });


    // // eslint-disable-next-line no-console
    // console.log(responseData);
    // response.setHeader('Content-Type', 'application/json');
    // response.data(responseData);
    //
    // response.end(JSON.stringify({ movieDetail: responseData }));
}
);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`IMDB visualization listening on  ${port}`));



app.use(express.static('./dist', {
  lastModified: true,
}));

