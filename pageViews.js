const express = require('express');
const fs = require('fs');

const app = express();
const dataFilePath = './pageViews.json';

function updatePageViewsFile(page, count) {
  let pageViews = {};
  
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    pageViews = JSON.parse(data);
  }

  pageViews[page] = count;
  
  fs.writeFileSync(dataFilePath, JSON.stringify(pageViews, null, 2));
}

app.get('/', (req, res) => {
  let pageViews = 0;

  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const pageViewsData = JSON.parse(data);
    pageViews = pageViewsData['/'] || 0;
  }

  pageViews++;

  updatePageViewsFile('/', pageViews);

  res.send(
    `<h1>Main Page</h1>
    <p>Counter: ${pageViews}</p>`
  );
});


app.get('/about', (req, res) => {
  let pageViews = 0;
  
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const pageViewsData = JSON.parse(data);
    pageViews = pageViewsData['/about'] || 0;
  }

  pageViews++;

  updatePageViewsFile('/about', pageViews);

  res.send(
    `<h1>About Page</h1>
    <p>Counter: ${pageViews}</p>`
  );
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
