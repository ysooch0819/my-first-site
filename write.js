console.log("write.js 실행됨");

const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const saveBtn = document.getElementById("save-btn");

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// ✏️ 수정 모드일 경우 기존 글 불러오기
if (postId) {
  const posts = loadPosts();
  const post = posts.find(p => p.id == postId);

  if (post) {
    titleInput.value = post.title;
    contentInput.value = post.content;
  }
}

// 💾 저장 버튼
saveBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("제목과 내용을 입력하세요");
    return;
  }

  const posts = loadPosts();

  if (postId) {
    // 수정
    const post = posts.find(p => p.id == postId);
    post.title = title;
    post.content = content;
  } else {
    // 새 글
    posts.push({
      id: Date.now(),
      title,
      content
    });
  }

  savePosts(posts);
  window.location.href = "index.html";
});
