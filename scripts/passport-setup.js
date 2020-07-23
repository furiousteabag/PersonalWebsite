const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});

passport.use(new VKontakteStrategy({
    clientID:     "7547532", // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
    clientSecret: "fG4pgKhKyYuWAsAkxNhL",
    callbackURL:  "http://asmirnov.xyz:3000/auth/vkontakte/callback"
  },
  function(accessToken, refreshToken, params, profile, done) {
    // console.log(params.email); // getting the email
    // User.findOrCreate({ vkontakteId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
  }
));
