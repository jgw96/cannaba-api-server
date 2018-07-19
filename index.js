const express = require('express');
const apiCache = require('apicache');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

console.log('im being ran');

// Constants used across app
const app = express();
const cache = apiCache.middleware;
const BASE_URL = 'https://www.cannabisreports.com/api/v1.0';

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

app.use(cors());

app.use(cache('2 minutes'));

// Routes
app.get('/', (req, res) => res.status(200).send('Hello World!'));

app.get('/flowers', async (req, res) => {
  console.log('url', `${BASE_URL}/strains?page=${req.query.page}&count=15&sort=createdAt`);
  const response = await fetch(`${BASE_URL}/strains?page=${req.query.page}&count=15&sort=createdAt`);
  const data = await response.json();

  console.log(data);

  res.status(200).json(data.data);
});

app.get('/flowers/flower/effect', async (req, res) => {
  const response = await fetch(`${BASE_URL}/strains/${req.query.upc}/effectsFlavors`);
  const data = await response.json();

  res.status(200).json(data);
});

app.get('/flowers/search', async (req, res) => {
  const response = await fetch(`${BASE_URL}/strains/search/${req.query.query}`);
  const data = await response.json();

  res.status(200).json(data.data);
});

app.get('/flowers/flower', async (req, res) => {
  const response = await fetch(`${BASE_URL}/strains/${req.query.tag}`);
  const data = await response.json();

  res.status(200).json(data.data);
});

app.get('/extracts', async (req, res) => {
  const response = await fetch(`${BASE_URL}/extracts?page=${req.query.page}&count=25&sort=createdAt`);
  const data = await response.json();

  res.status(200).json(data.data)
});

app.get('/extracts/extract', async (req, res) => {
  const response = await fetch(`${BASE_URL}/extracts/${req.query.tag}`);
  const data = await response.json();

  res.status(200).json(data.data);
});

app.get('/edibles', async (req, res) => {
  const response = await fetch(`${BASE_URL}/edibles?page=${req.query.page}&count=25&sort=createdAt`);
  const data = await response.json();

  res.status(200).json(data.data);
});

app.get('/edibles/edible', async (req, res) => {
  const response = await fetch(`${BASE_URL}/edibles/${req.query.tag}`);
  const data = await response.json();

  res.status(200).json(data.data);
});

app.get('/edibles/edible/effect', async (req, res) => {
  const response = await fetch(`${BASE_URL}/edibles/${req.query.upc}/effectsFlavors`);
  const data = await response.json();

  res.status(200).json(data);
});

app.get('/dispensaries', async (req, res) => {
  const response = await fetch(`${BASE_URL}/dispensaries?page=${req.query.page}&count=15&sort=-updatedAt`);
  const data = await response.json();

  res.status(200).json(data.data);
});

app.get('/dispensaries/dispensary', async (req, res) => {
  const cleanedName = req.query.name.replace(/\s+/g, '-').toLowerCase();
  const response = await fetch(`${BASE_URL}/dispensaries/${req.query.state}/${req.query.city}/${cleanedName}`);
  const data = await response.json();

  res.status(200).json(data.data);
});

app.get('/dispensaries/dispensary/menu', async (req, res) => {
  const cleanedName = req.query.name.replace(/\s+/g, '-').toLowerCase();
  const response = await fetch(`${BASE_URL}/dispensaries/${req.query.state}/${req.query.city}/${cleanedName}/${req.query.type}`);
  console.log(`${BASE_URL}/dispensaries/${req.query.state}/${req.query.city}/${cleanedName}/${req.query.type}`)
  const data = await response.json();

  res.status(200).json(data.data);
});

app.get('/sentiment', async (req, res) => {
  const response = await fetch(`https://cannabasentiment.azurewebsites.net/api/HttpTriggerJS/name/${req.query.text}?code=sjut5lRIwx1eyXLKowxR4dr3Op9gnv0ZvDmqfZVLF02mNeN3OMXboQ==`);
  const data = await response.json();

  res.status(200).json(data);
})


app.listen(process.env.PORT || 3000, () => console.log('Cannaba server running'));