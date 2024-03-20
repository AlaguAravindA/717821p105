const express = require('express');
const app = express();
const windowsize = 12;
let windowprev = [];

const session = require('express-session');
// const fetch = require('node-fetch'); 

app.use(session({
  secret: 'hjkfdvjhk',
  resave: false,
  saveUninitialized: false,
}));


app.use((req, res, next) => {
  const timeoutDuration = 500; 
  let timedOut = false;

  
  const timeoutId = setTimeout(() => {
    timedOut = true;
    next(new Error('Request timed out'));
  }, timeoutDuration);

 
  const originalEnd = res.end;
  res.end = function () {
    clearTimeout(timeoutId);
    originalEnd.apply(this, arguments);
  };

  next();
});

app.get('/numbers/e', async (req, res) => {
  try {
    const numbers = await fetch('http://20.244.56.144/numbers/even').then((response) => response.json());
    let windowcurrent = [];

    if (numbers.numbers.length > windowsize) {
      for (let i = windowsize - 1; i >= 0; i--) {
        windowcurrent[i] = numbers.numbers[i];
      }
    } else {
      windowcurrent = numbers.numbers;
    }

    const sum = windowcurrent.reduce((acc, val) => acc + val, 0);
    const avg = sum / numbers.numbers.length;

    res.json({
      "windowsPrevState": windowprev,
      "windowCurrState": windowcurrent,
      "numbers": numbers.numbers,
      "avg": avg
    });

    windowprev = windowcurrent;
    req.session.prevstate = windowprev;
  } catch (error) {
    res.json({ error: "500ms exceed" });
  }
});
app.get('/numbers/p', async (req, res) => {
    try {
      const numbers = await fetch('http://20.244.56.144/numbers/primes').then((response) => response.json());
      let windowcurrent = [];
  
      if (numbers.numbers.length > windowsize) {
        for (let i = windowsize - 1; i >= 0; i--) {
          windowcurrent[i] = numbers.numbers[i];
        }
      } else {
        windowcurrent = numbers.numbers;
      }
  
      const sum = windowcurrent.reduce((acc, val) => acc + val, 0);
      const avg = sum / numbers.numbers.length;
  
      res.json({
        "windowsPrevState": windowprev,
        "windowCurrState": windowcurrent,
        "numbers": numbers.numbers,
        "avg": avg
      });
  
      windowprev = windowcurrent;
      req.session.prevstate = windowprev;
    } catch (error) {
        res.json({ error: "500ms exceed" });
    }
  });
  app.get('/numbers/r', async (req, res) => {
    try {
      const numbers = await fetch('http://20.244.56.144/numbers/rand').then((response) => response.json());
      let windowcurrent = [];
  
      if (numbers.numbers.length > windowsize) {
        for (let i = windowsize - 1; i >= 0; i--) {
          windowcurrent[i] = numbers.numbers[i];
        }
      } else {
        windowcurrent = numbers.numbers;
      }
  
      const sum = windowcurrent.reduce((acc, val) => acc + val, 0);
      const avg = sum / numbers.numbers.length;
  
      res.json({
        "windowsPrevState": windowprev,
        "windowCurrState": windowcurrent,
        "numbers": numbers.numbers,
        "avg": avg
      });
  
      windowprev = windowcurrent;
      req.session.prevstate = windowprev;
    } catch (error) {
        res.json({ error: "500ms exceed" });
    }
  });
  app.get('/numbers/f', async (req, res) => {
    try {
      const numbers = await fetch('http://20.244.56.144/numbers/fibo').then((response) => response.json());
      let windowcurrent = [];
  
      if (numbers.numbers.length > windowsize) {
        for (let i = windowsize - 1; i >= 0; i--) {
          windowcurrent[i] = numbers.numbers[i];
        }
      } else {
        windowcurrent = numbers.numbers;
      }
  
      const sum = windowcurrent.reduce((acc, val) => acc + val, 0);
      const avg = sum / numbers.numbers.length;
  
      res.json({
        "windowsPrevState": windowprev,
        "windowCurrState": windowcurrent,
        "numbers": numbers.numbers,
        "avg": avg
      });
  
      windowprev = windowcurrent;
      req.session.prevstate = windowprev;
    } catch (error) {
        res.json({ error: "500ms exceed" });
    }
  });

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});