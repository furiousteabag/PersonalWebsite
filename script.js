function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var allText = "";
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                addBlogPost(file, "lskdjf", allText);
                console.log(allText);
            }
        }
    };
    rawFile.send(allText);
}

function readDirectory(file) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", file, false); // false for synchronous request
    xmlHttp.send(null);
    var ret = xmlHttp.responseText;
    var fileList = ret.split("\n");
    for (i = 0; i < fileList.length; i++) {
        var fileinfo = fileList[i].split(" ");
        alert(fileinfo[1]);
        if (fileinfo[0] == "201:") {
            alert(fileinfo[1]);
            document.write(fileinfo[1] + "<br>");
            document.write('<img src="' + file + fileinfo[1] + '"/>');
        }
    }

}

function addBlogPost(title, time, text) {
    let blogPost = document.createElement("div");
    blogPost.className = "blog-post";

    // Header.
    let blogHeader = document.createElement("div");
    blogHeader.className = "blog-header";

    let blogHeaderTitle = document.createElement("h3");
    blogHeaderTitle.className = "blog-header-title";
    blogHeaderTitle.innerHTML = title;

    let blogHeaderTime = document.createElement("p");
    blogHeaderTime.className = "blog-header-time";
    blogHeaderTime.innerHTML = time;

    blogHeader.append(blogHeaderTitle);
    blogHeader.append(blogHeaderTime);

    // Post.
    let blogContent = document.createElement("div");
    blogContent.innerHTML = text;

    // Merging elements.
    blogPost.append(blogHeader);
    blogPost.append(blogContent);

    document.getElementById("blog").append(blogPost);
}

addBlogPost("asdf", "sdlkfj", "sdlfkj");

readTextFile("blog");
readDirectory("blog");
