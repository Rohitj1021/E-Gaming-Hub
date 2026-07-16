const express = require('express');
const axios = require('axios');

const router = express.Router();

// Joke APIs
const JOKE_APIS = {
  dadJokes: 'https://icanhazdadjoke.com/',
  officialJokes: 'https://official-joke-api.appspot.com/random_joke',
  programmingJokes: 'https://official-joke-api.appspot.com/jokes/programming/random',
};

// @desc Get a random dad joke
router.get('/dad-joke', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.dadJokes, {
      headers: { Accept: 'application/json' },
    });

    res.json({
      type: 'dad-joke',
      joke: response.data.joke,
      id: response.data.id,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch dad joke',
      message: error.message,
    });
  }
});

// @desc Get a random official joke
router.get('/official-joke', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.officialJokes);

    res.json({
      type: 'official-joke',
      setup: response.data.setup,
      punchline: response.data.punchline,
      id: response.data.id,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch official joke',
      message: error.message,
    });
  }
});

// @desc Get a random programming joke
router.get('/programming-joke', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.programmingJokes);

    res.json({
      type: 'programming-joke',
      setup: response.data.setup,
      punchline: response.data.punchline,
      id: response.data.id,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch programming joke',
      message: error.message,
    });
  }
});

// @desc Get any random joke (random API)
router.get('/random', async (req, res) => {
  try {
    const apis = Object.values(JOKE_APIS);
    const randomApi = apis[Math.floor(Math.random() * apis.length)];

    const response = await axios.get(randomApi, {
      headers: { Accept: 'application/json' },
    });

    // Normalize response based on API
    let joke;
    if (response.data.joke) {
      joke = {
        type: 'dad-joke',
        content: response.data.joke,
      };
    } else {
      joke = {
        type: 'setup-punchline',
        setup: response.data.setup,
        punchline: response.data.punchline,
      };
    }

    res.json(joke);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch random joke',
      message: error.message,
    });
  }
});

// @desc Get multiple jokes
router.get('/batch/:count', async (req, res) => {
  try {
    const count = Math.min(parseInt(req.params.count) || 5, 20);
    const jokes = [];

    for (let i = 0; i < count; i++) {
      const response = await axios.get(JOKE_APIS.officialJokes);
      jokes.push({
        setup: response.data.setup,
        punchline: response.data.punchline,
        id: response.data.id,
      });
    }

    res.json({
      count: jokes.length,
      jokes,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch jokes',
      message: error.message,
    });
  }
});

module.exports = router;
