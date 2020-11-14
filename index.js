import express from 'express';

const app = express();

// set the library (template engine || view engine) to use for all requests
app.set('view engine', 'ejs');

const PORT = 3004;

// request callback function to render the html data (html data is alr in ejs file)
const whenRequestForHtml = (request, response) => {
  console.log('request came in');

  // render the html data in html.ejs file
  response.render('html');

  // for render documentation:
  // https://expressjs.com/en/api.html#res.render
};

// set the route for main page
app.get('/', whenRequestForHtml);

// initialise the request listener port functionality
app.listen(PORT);
