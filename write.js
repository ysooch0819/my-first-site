const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
  const title = document.getElementById("title-input").value;
  const content = document.getElementById("content-input").value;

  if (!title || !content) {
    alert("제목과 내용을 입력하세요");
    return;
  }

  const posts = loadPosts();

  const newPost = {
    id: Date.now(),
    title,
    summary: content,
  };

  posts.push(newPost);
  savePosts(posts);

  window.location.href = "index.html";
});

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (postId) {
  const post = getPosts().find(p => p.id == postId);

  if (post) {
    document.getElementById("title-input").value = post.title;
    document.getElementById("content-input").value = post.content;
  }
}
