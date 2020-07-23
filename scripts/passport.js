const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport-setup.js')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use(cookieSession({
  name: 'webim-session',
  keys: ['key1', 'key2']
}))

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/failed', (req, res) => res.send('You failed to log in!'))
app.get('/good', (req, res) => res.send('You succesfully loged in!'))

app.get('/auth/vkontakte',
  passport.authenticate('vkontakte'),
  function(req, res){
    // The request will be redirected to vk.com for authentication, so
    // this function will not be called.
});

app.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
});



app.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/')
})







app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))

