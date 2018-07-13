const express = require('express');
const GenerationEngine = require('./engine');

const app = express();
const engine = new GenerationEngine();
const port = 3000;

// convention to use req, and res
// rather than request and response even though the latter is more explicit
// the req object is unused for now
app.get('/dragon/new', (req, res) => {
  res.json({ dragon: engine.generation.newDragon() });
});

engine.start();

app.listen(port, () => console.log(`listening on port ${port}`));