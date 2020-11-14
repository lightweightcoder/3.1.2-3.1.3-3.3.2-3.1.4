import express from 'express';

const app = express();

// set the library (template engine || view engine) to use for all requests
app.set('view engine', 'ejs');

// set configuration to receive POST request data as an object
app.use(express.urlencoded({ extended: false }));

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

// Routes HTTP POST requests to the specified path with the specified callback functions
// documentation: https://expressjs.com/en/api.html#express.urlencoded
app.post('/recipe', (request, response) => {
  console.log('request body:', request.body);
  response.send('we saved your recipe');
});

// initialise the request listener port functionality
app.listen(PORT);
