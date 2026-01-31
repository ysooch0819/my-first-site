console.log("write.js 실행됨");

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
    content,
  };

  posts.push(newPost);
  savePosts(posts);

  window.location.href = "index.html";
});
