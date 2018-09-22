const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const path = require('path');


const app = express();

// load models
require('./server/models/User');
require('./server/models/Story');

// load passport
require('./server/config/passport')(passport);

// load Routes
const index = require('./server/routes/index');
const auth = require('./server/routes/auth');
const stories = require('./server/routes/stories');

// load keys
const keys = require('./server/config/keys_dev');


/*point to the dist folder to serve the index file*/
app.use(express.static(path.join(__dirname, 'dist/storybooks')));



// map global promise
mongoose.Promise = global.Promise;
//connect to mlabs
mongoose.connect(keys.mongoURI,{
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

/*catch all routes and return to the index file*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/storybooks/index.html'));
});

const port = process.env.PORT || 4600;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;
