// index.js
const app = require('./src/config/express');
const routes = require('./src/routes');

app.use(routes);

// expose the application to the listening port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Express server is currently listening on port ${PORT}`);
});