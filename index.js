import express from 'express';
import methodOverride from 'method-override';
import { add, read, write } from './jsonFileStorage.js';

// create an express application
const app = express();

// set the port number
const PORT = 3004;

// set the view engine to ejs
app.set('view engine', 'ejs');

// config to accept request form data
app.use(express.urlencoded({ extended: false }));

// override with POST having ?_method=PUT (in edit.ejs)
app.use(methodOverride('_method'));

// Routes =============================================================

// start of functionality for user to create a new recipe by filling up a form ------------

// render the form (recipe.ejs) that will create the request
app.get('/recipe', (request, response) => {
  response.render('recipe');
});

// accept form request and add the new recipe to data.json
// 1st param: the url that the post request is coming from
// 2nd param: callback to execute when post request is made
app.post('/recipe', (request, response) => {
  console.log('request body', request.body);

  // add an element to the array
  add('data.json', 'recipes', request.body, (data, error) => {
    // check for errors
    if (error) {
      response.status(500).send('sorry could not add data to file');
      return;
    }

    // send back an acknowledgement
    response.send('done post!');
  });
});

// end of functionality for user to create a new recipe by filling up a form --------------
// ----------------------------------------------------------------------------------------

// start of functionality for user to edit a recipe by editing it in a form --------------

// render the form (edit.js) that wil create the request
app.get('/recipe/:index/edit', (request, response) => {
  console.log('get request came in');

  // read the JSON file
  read('data.json', (data) => {
    console.log('done with reading');

    // get the index param
    const { index } = request.params;

    // get out the recipe
    const recipe = data.recipes[index];
    recipe.index = index; // add an index key to the recipe so we can use it in edit.ejs
    const ejsData = { recipe };

    // render the form, pass in the recipe
    response.render('edit', ejsData);
  });
});

// accept form request and edit the recipe in data.json
// 1st param: the url that the put request is coming from
// (i.e. the url in the action attribute of the form, not including queries)
app.put('/recipe/:index', (request, response) => {
  const { index } = request.params;

  read('data.json', (data) => {
    // completely replace the obj here
    data.recipes[index] = request.body;

    write('data.json', data, (doneData) => {
      response.send('done!');
    });
  });
});

// end of functionality for user to edit a recipe by editing it in a form --------------
// -------------------------------------------------------------------------------------

// set the port to listen for requests
app.listen(PORT);
