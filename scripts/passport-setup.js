const passport = require("passport");
const VKontakteStrategy = require("passport-vkontakte").Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    done(null, user);
});

passport.use(
    new VKontakteStrategy(
        {
            clientID: "7549471",
            clientSecret: "zQKqABIPn1WJYgeYlIBK",
            callbackURL: "https://asmirnov.xyz:8443/vk/callback"
        },
        function (accessToken, refreshToken, params, profile, done) {
            console.log(accessToken);
            console.log(params);
            console.log(profile);
            return done(null, profile);
        }
    )
);
