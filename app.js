require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./server/routes/indexRoutes.js');
const dashboardRouter = require('./server/routes/dashboardRoutes.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

// Handle 404
app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
