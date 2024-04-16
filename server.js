const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({'extended': true}));
server.use(logger('dev'));

// Routes
server.get('/do_a_random', (req, res) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Setup static page serving for all the pages in "public" inside "lab-7" folder
const publicServedFilesPath = path.join(__dirname,'public');
server.use(express.static(publicServedFilesPath));

// POST route handler for mad lib submission
server.post('/submit', (req, res) => {
    const { noun, verb, adjective, adverb, pluralNoun } = req.body;
    if (!noun || !verb || !adjective || !adverb || !pluralNoun) {
        res.send(`
          <h1>Submission Failed</h1>
          <p>Please fill out ALL fields</p>
          <a href="/">Go Back to Form</a>
        `);
        return;
    }
    const madLib = `Once upon a ${adjective} ${noun}, deep in the heart of the enchanted forest, there lived a ${adjective} ${noun}. This ${noun} was known far and wide for its ${adjective} ${noun}, which could ${verb} with unparalleled grace.

One ${adjective} day, as the ${noun} ${adverb} ${verb} through the lush greenery, it stumbled upon a group of ${pluralNoun}. These ${pluralNoun} were not like any others the ${noun} had encountered before. They were ${adjective} and ${adjective}, with eyes that twinkled like ${pluralNoun} in the night sky.

Filled with ${adjective} curiosity, the ${noun} approached the group, and soon they were ${verb} and ${verb} together as if they had been ${verb} for years. The ${adjective} ${pluralNoun} shared tales of their adventures, and the ${noun} listened with ${adjective} fascination.

As the sun began to ${verb} below the horizon, the ${noun} knew that it had found its true ${noun}. With its new friends by its side, the ${noun} set off on a ${adjective} journey, ready to ${verb} the wonders of the world and ${verb} its own destiny.

And so, the ${adjective} ${noun} and its ${adjective} companions ${adverb} ${verb} into the night, their laughter echoing through the forest as they embarked on their ${adjective} adventure.
`;
    res.send(`
      <h1>Submission Successful</h1>
      <p>${madLib}</p>
      <a href="/">Go Back to Form</a>
    `);
});

// Start server
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));
