import app from "./app.js";



app.get('/', (req, res) => {
  res.send('Server is running...');
});