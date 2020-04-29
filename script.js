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

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);

    var allText = "";
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                lines = allText.split("\n");
                addBlogPost(lines[0], lines[1], lines[2]);
                console.log(allText);
            }
        }
    };
    rawFile.send(allText);
}








// Adding posts to html.
let i = 10;
while (i > 0) {
    readTextFile("blog/" + i);
    i--;
}
