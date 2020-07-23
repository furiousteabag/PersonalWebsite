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
            clientID: "7547532",
            clientSecret: "fG4pgKhKyYuWAsAkxNhL",
            callbackURL: "https://asmirnov.xyz:8443/vk/callback"
        },
        function (accessToken, refreshToken, params, profile, done) {
            console.log(accessToken);
            return done(null, profile);
        }
    )
);
