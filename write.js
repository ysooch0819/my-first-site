console.log("write.js 실행됨");

const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const saveBtn = document.getElementById("save-btn");

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

let posts = getPosts();

// 🔹 수정 모드: 기존 글 채우기
if (postId) {
  const post = posts.find(p => p.id == postId);

  if (post) {
    titleInput.value = post.title;
    contentInput.value = post.summary;
  }
}

// 🔹 저장 버튼
saveBtn.addEventListener("click", () => {
  const title = titleInput.value;
  const content = contentInput.value;

  if (!title || !content) {
    alert("제목과 내용을 입력하세요");
    return;
  }

  if (postId) {
    // ✏️ 수정
    const post = posts.find(p => p.id == postId);
    post.title = title;
    post.summary = content;
    alert("수정되었습니다");
  } else {
    // ✍️ 새 글
    posts.push({
      id: Date.now(),
      title,
      summary: content,
    });
    alert("저장되었습니다");
  }

  savePosts(posts);
  window.location.href = "index.html";
});
