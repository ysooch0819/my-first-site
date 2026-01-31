function loadPosts(){
    const data = localStorage.getItem("posts");
    if(data){
        return JSON.parse(data);
    }
    localStorage.setItem("posts", JSON.stringify(defaultPosts));
    return defaultPosts;
}

function savePosts(posts){
    localStorage.setItem("posts", JSON.stringify(posts));
}