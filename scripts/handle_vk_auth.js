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

// Adds user info.
function userInfoPlacer() {
    file = "../user_data/user_name.txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);

    var allText = "";

    rawFile.onreadystatechange = function () {
        // If operation finished.
        if (rawFile.readyState === 4) {
            // 200 -- request succeeded.
            if (rawFile.status === 200) {
                var allText = rawFile.responseText;

                let h1 = document.createElement("h1");
                h1.className = "text-center font-weight-bold";
                h1.innerHTML = "Hello, " + allText;
                document.getElementById("vk").append(h1);

                console.log(allText);
            }
        }
    };
    rawFile.send(allText);
}

// Adds friends info.
function friendsInfoPlacer() {
    file = "../user_data/user_friends.txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);

    var allText = "";

    rawFile.onreadystatechange = function () {
        // If operation finished.
        if (rawFile.readyState === 4) {
            // 200 -- request succeeded.
            if (rawFile.status === 200) {
                var allText = rawFile.responseText;

                let h3 = document.createElement("h3");
                h3.className = "text-center";
                h3.innerHTML = "Your's friends:";

                let ul = document.createElement("ul");

                lines = allText.split("\n");

                lines.slice(0, -1).forEach(function (line) {
                    let li = document.createElement("li");
                    li.innerHTML = line;
                    ul.append(li);
                });

                document.getElementById("vk").append(h3);
                document.getElementById("vk").append(ul);
                console.log(allText);
            }
        }
    };
    rawFile.send(allText);
}

function logoutButton() {
    let div = document.createElement("div");
    div.className = "links-buttons";

    let a = document.createElement("a");
    a.href = "https://asmirnov.xyz/webim.html";

    let button = document.createElement("button");
    button.id = "btn_id";
    button.className = "btn";
    button.innerHTML = "Log out";

    a.append(button);
    div.append(a);
    document.getElementById("vk").append(div);

    document.getElementById("btn_id").addEventListener("click", function () {
        document.cookie =
            "access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    });
}

// Checks if there is access_token cookie.
// If not, places redirect button.
// If yes, draws information about user.
async function handleVK() {
    var myCookie = getCookie("access_token");

    if (myCookie == null) {
        await new Promise(r => setTimeout(r, 100));
        authButtonPlacer();
    } else {
        userInfoPlacer();
        await new Promise(r => setTimeout(r, 100));
        friendsInfoPlacer();
        await new Promise(r => setTimeout(r, 100));
        logoutButton();
    }
}

function readTextFile(file) {}

handleVK();
