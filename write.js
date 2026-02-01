// write.js

// 1. URL에서 id 가져오기 (수정 여부 판단)
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// 2. posts 불러오기
const posts = loadPosts();

// 3. input 요소 가져오기
const authorInput = document.getElementById("post-author");
const titleInput = document.getElementById("post-title");
const contentInput = document.getElementById("post-content");
const saveBtn = document.getElementById("save-btn");

// 4. 수정 모드라면 기존 값 채우기
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

// 5. 저장 버튼 클릭
saveBtn.addEventListener("click", () => {
  // ✅ 여기서 author 읽는다
  const author = authorInput.value.trim() || "익명";
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("제목과 내용을 입력하세요.");
    return;
  }

  if (editingPost) {
    // ✏️ 수정
    editingPost.author = author;
    editingPost.title = title;
    editingPost.content = content;
  } else {
    // ✍️ 새 글
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
