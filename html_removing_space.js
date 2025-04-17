const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.text({ type: '*/*' }));

function flattenHTML(html) {
  return html
    .replace(/\n/g, '')
    .replace(/\r/g, '')
    .replace(/\t/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

app.post('/flatten-html', (req, res) => {
  const rawHTML = req.body;

  if (!rawHTML || typeof rawHTML !== 'string') {
    return res.status(400).send('Invalid HTML input');
  }

  const flattened = flattenHTML(rawHTML);
  res.setHeader('Content-Type', 'text/plain');
  res.send(flattened);
});

app.listen(port, () => {
  console.log(`HTML Flattener API running at http://localhost:${port}`);
});
