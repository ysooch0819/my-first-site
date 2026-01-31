const params = new URLSearchParams(window.location.search);
const postId = parseInt(params.get("id"));

const post = posts.find((p) => p.id === postId);

document.getElementById("post-title").textContent = post.title;
document.getElementById("post-content").textContent = post.summary;
