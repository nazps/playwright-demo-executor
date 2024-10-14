import express from 'express';
import { Project, TestRunner } from './TestRunner';

const app = express();
const port = 3000;


app.use(express.static('public'));

app.get('/events', (req, res) => {
  // Ustaw nagłówki SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Tworzenie instancji TestRunner dla projektu CHROMIUM (można dostosować)
  const testRunner = new TestRunner(Project.CHROMIUM);

  // Funkcja emitująca dane na bieżąco do przeglądarki
  const sendData = (data:string) => {
      res.write(`data: ${data}\n\n`);
  };

  // Uruchamianie testów Playwright
  testRunner.runTests('create account and navigate to it', sendData)
      .then(() => {
          // Zakończ połączenie SSE, gdy testy się zakończą
          res.write('data: [TESTS_COMPLETED]\n\n');
          res.end();
      })
      .catch(err => {
          res.write(`data: [ERROR]: ${err.message}\n\n`);
          res.end();
      });

  // Zakończenie połączenia po stronie klienta
  req.on('close', () => {
      console.log('Client disconnected');
      res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});