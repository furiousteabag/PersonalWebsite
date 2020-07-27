const vk_io = require("vk-io");
const fs = require("fs");
const { VK } = vk_io;

const token_local = fs.readFileSync(
    "../user_data/token.txt",
    {
        encoding: "utf8",
        flag: "r"
    },
    function (err) {
        console.log(err);
    }
);

console.log(token_local);
console.log("---------------");

const vk = new VK({
    token: token_local
});

async function getUserCredentials() {
    const response = await vk.api.users.get({});

    first_name = response[0].first_name;
    last_name = response[0].last_name;
    to_write_in_file = first_name + " " + last_name;

    fs.writeFile("../user_data/user_name.txt", to_write_in_file, function (
        err,
        result
    ) {
        if (err) console.log("error", err);
    });

    console.log(first_name + " " + last_name);
}

async function getFriendsCredentials(n) {
    const response = await vk.api.friends.get({
        order: "random",
        count: n,
        fields: "nickname"
    });

    fs.closeSync(fs.openSync("../user_data/user_friends.txt", "w"));

    response.items.forEach(function (person) {
        first_name = person.first_name;
        last_name = person.last_name;
        to_write_in_file = first_name + " " + last_name + "\n";
        console.log(to_write_in_file);
        fs.appendFileSync("../user_data/user_friends.txt", to_write_in_file);
    });
}

getUserCredentials().catch(console.log);
getFriendsCredentials(3).catch(console.log);

function getRandomElems(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
