// Reading files for enabling https.
var fs = require("fs");
var http = require("http");
var https = require("https");
var privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/asmirnov.xyz/privkey.pem",
    "utf8"
);
var certificate = fs.readFileSync(
    "/etc/letsencrypt/live/asmirnov.xyz/fullchain.pem",
    "utf8"
);
var credentials = { key: privateKey, cert: certificate };

// Requiring libraries.
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport-setup.js");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cookieSession({
        name: "webim-session",
        keys: ["key1", "key2"]
    })
);

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/failed", (req, res) => res.send("You failed to log in!"));
app.get("/good", (req, res) => res.send("You succesfully loged in!"));
app.get("/vk", passport.authenticate("vkontakte"), function (req, res) {
    // The request will be redirected to vk.com for authentication, so
    // this function will not be called.
});
app.get(
    "/vk/callback",
    passport.authenticate("vkontakte", { failureRedirect: "/failed" }),
    function (req, res) {
        res.redirect("/good");
    }
);
app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/");
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () =>
    console.log("VK auth http app listening on port 8080")
);
httpsServer.listen(8443, () =>
    console.log("VK auth https app listening on port 8443")
);
