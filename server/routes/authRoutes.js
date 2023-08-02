const express = require('express')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../models/userModel.js')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value
      }
      console.log(newUser)

      try {
        let user = await User.findOne({ googleId: profile.id })

        if (user) {
          return done(null, user)
        }

        user = await User.create(newUser)
        done(null, user)
        //
      } catch (error) {
        console.log(error)
      }
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
    }
  )
)

// Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard'
  })
)

// Routes if something goes wrong
router.get('/login-failure', (req, res) => {
  res.send('Something went wrong...')
})

// Persist user data after successful authentication
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

// Retrieve user data from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

// Destroy user session
router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (!error) return res.redirect('/')

    console.log(error)
    res.send('Error loggin out')
  })
})

module.exports = router
