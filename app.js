require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db.js');
const indexRouter = require('./server/routes/indexRoutes.js');
const dashboardRouter = require('./server/routes/dashboardRoutes.js');
const authRouter = require('./server/routes/authRoutes.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_DATABASE_URL,
    }),
    // cookie: { maxAge: new Date(Date.now() + (3600000)) }
    //                        Days * 24 * 60 * 60 * 1000
    //                             hours * 60 * 60 * 1000
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect to MONGODB
connectDB();

// Static Files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/', authRouter);

// Handle 404
app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
