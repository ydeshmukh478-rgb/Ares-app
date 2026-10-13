const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const URL = process.env.BACKEND_URL || 'http://localhost:8000/api';

// Use native fetch (Node 18+) or fallback to node-fetch
const fetch = globalThis.fetch || ((...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args)));

app.get('/', async function(req, res) {
    const options = {
        method: 'GET'
    };

    try {
        const apiResponse = await fetch(URL, options);
        const data = await apiResponse.json();
        console.log('Fetched from backend:', data);
        res.render('index', data);
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ msg: 'Internal server Error.' });
    }
});

app.listen(3000, '0.0.0.0', function() {
    console.log(`Ares listening on port 3000!`);
});
