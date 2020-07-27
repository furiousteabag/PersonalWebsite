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

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("./passport-setup.js");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.get("/", (req, res) => res.redirect("https://asmirnov.xyz/webim.html"));
app.get("/failed", (req, res) => res.send("You failed to log in!"));
app.get("/good", (req, res) => res.send("You succesfully loged in!"));
app.get(
    "/vk",
    passport.authenticate("vkontakte", { scope: 140488159 }),
    function (req, res) {
    }
);
app.get(
    "/vk/callback",
    passport.authenticate("vkontakte", { failureRedirect: "/failed" }),
    function (req, res) {
        console.log(req.user);
        res.cookie('access_token', req.user)
        console.log("------------");
        res.redirect("/");
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
