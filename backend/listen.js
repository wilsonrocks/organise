const app = require('./app');

app.listen(3000, function () {
  console.log('ORGANISE: Helping people campaign with fewer grumpy emails\n');
  console.log(`Listening on port 3000 in ${process.env.NODE_ENV} mode...`);
});