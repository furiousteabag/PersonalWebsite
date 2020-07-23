/**
 * Adding blog post to the page.
 * Args:
 *     title (string).
 *     time (string).
 *     text (string).
 */
function addBlogPost(title, time, text) {
    let blogPost = document.createElement("div");
    blogPost.className = "blog-post";

    /** Creating post header. */
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

    /** Creating post content. */
    let blogContent = document.createElement("div");
    blogContent.innerHTML = text;

    /** Merging header and content to post. */
    blogPost.append(blogHeader);
    blogPost.append(blogContent);

    document.getElementById("blog").append(blogPost);
}

/**
 * Getting blog post from web server and
 * calling addBlogPost function to place
 * it on page.
 * Args:
 *     file (string): path to file.
 */
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);

    var allText = "";

    rawFile.onreadystatechange = function() {
        // If operation finished.
        if (rawFile.readyState === 4) {
            // 200 -- request succeeded.
            if (rawFile.status === 200) {
                var allText = rawFile.responseText;
                lines = allText.split("\n");
                addBlogPost(lines[0], lines[1], lines[2]);
                console.log(allText);
            }
        }
    };
    rawFile.send(allText);
}














/** Reading all numbered file from directory blog. */
let i = 10;
while (i > 0) {
    readTextFile("blog/" + i);
    i--;
}
