const params = new URLSearchParams(window.location.search);
const postId = parseInt(params.get("id"));

const posts = loadPosts();
const post = posts.find((p) => p.id === postId);

document.getElementById("title-input").value = post.title;
document.getElementById("content-input").value = post.summary;

document.getElementById("back-link").href = `post.html?id=${postId}`;

document.getElementById("update-btn").addEventListener("click", () => {
  post.title = document.getElementById("title-input").value;
  post.summary = document.getElementById("content-input").value;

  savePosts(posts);
  window.location.href = `post.html?id=${postId}`;
});
