/**
 * @file Server example.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

const express = require('express')
const app = express()
const port = 3000

app.use('/', express.static(__dirname + '/dist'));

app.get('/test', (req, res) => {
  res.send('Hello World!')
});

app.get('/json', (req, res) => {
  res.json({
    test: 'test'
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
});
