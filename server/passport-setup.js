const passport = require("passport");
const VKontakteStrategy = require("passport-vkontakte").Strategy;
const fs = require('fs');

var config = JSON.parse(fs.readFileSync('../config.json', 'utf8'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
    new VKontakteStrategy(
        {
            clientID: config.clientID,
            clientSecret: config.clientSecret,
            callbackURL: "https://asmirnov.xyz:8443/vk/callback"
        },
        function (accessToken, refreshToken, params, profile, done) {
            return done(null, accessToken);
        }
    )
);
