function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);

    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}

// Adds button that redirects to auth page.
function authButtonPlacer() {
    let div = document.createElement("div");
    div.className = "links-buttons";

    let a = document.createElement("a");
    a.href = "https://asmirnov.xyz:8443/vk";

    let button = document.createElement("button");
    button.className = "btn";
    button.innerHTML = "VK login";

    a.append(button);
    div.append(a);
    document.getElementById("vk").append(div);
}

// Adds user info and friends.
function userInfoPlacer(text) {
    let h1 = document.createElement("h1");
    h1.className = "text-center font-weight-bold";
    h1.innerHTML = "Hello, " + text;
    document.getElementById("vk").append(h1);
}

// Checks if there is access_token cookie.
// If not, places redirect button.
// If yes, draws information about user.
function handleVK() {
    var myCookie = getCookie("access_token");

    if (myCookie == null) {
        authButtonPlacer();
    } else {
        userInfoPlacer(myCookie);
    }
}

handleVK();
