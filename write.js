document.addEventListener("DOMContentLoaded", () => {
  // write.html에서만 실행되도록 가드
  const authorInput = document.getElementById("post-author");
  const titleInput = document.getElementById("post-title");
  const contentInput = document.getElementById("post-content");
  const saveBtn = document.getElementById("save-btn");

  // ❗ write.html이 아니면 즉시 종료
  if (!authorInput || !titleInput || !contentInput || !saveBtn) {
    return;
  }

  // 1. URL에서 id 가져오기
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  // 2. posts 불러오기
  const posts = loadPosts();

  // 3. 수정 모드
  let editingPost = null;

  if (postId) {
    editingPost = posts.find((p) => p.id === Number(postId));

    if (!editingPost) {
      alert("게시글을 찾을 수 없습니다.");
      location.href = "index.html";
    }

    authorInput.value = editingPost.author || "";
    titleInput.value = editingPost.title;
    contentInput.value = editingPost.content;
  }

  // 4. 저장 버튼
  saveBtn.addEventListener("click", () => {
    const author = authorInput.value.trim() || "익명";
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    if (editingPost) {
      editingPost.author = author;
      editingPost.title = title;
      editingPost.content = content;
    } else {
      posts.push({
        id: Date.now(),
        author,
        title,
        content,
        comments: []
      });
    }

    savePosts(posts);
    location.href = "index.html";
  });
});
