// 1. 주소에서 id 가져오기
const params = new URLSearchParams(window.location.search);
const postId = parseInt(params.get("id"));

// 2. 게시글 불러오기
const posts = loadPosts();
const post = posts.find((p) => p.id === postId);

// 3. 게시글 표시
document.getElementById("post-title").textContent = post.title;
document.getElementById("post-content").textContent = post.content;

// 댓글 배열 초기화 (없으면 생성)
if (!post.comments) {
  post.comments = [];
}

if (!post) {
  alert("게시글을 찾을 수 없습니다.");
  location.href = "index.html";
}



// 4. 수정 링크 (기존 기능 유지)
const editLink = document.getElementById("edit-link");
if (post) {
  editLink.href = `write.html?id=${post.id}`;
}

// ==================
// Level 11: 댓글 기능
// ==================

// 5. 댓글 렌더링
const commentList = document.getElementById("comment-list");

function renderComments() {
  commentList.innerHTML = "";

  post.comments.forEach((comment) => {
    const li = document.createElement("li");
    li.textContent = comment;
    commentList.appendChild(li);
  });
}

renderComments();

// 6. 댓글 추가
const commentInput = document.getElementById("comment-input");
const commentBtn = document.getElementById("comment-btn");

commentBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (!text) return;

  post.comments.push(text);
  savePosts(posts);

  commentInput.value = "";
  renderComments();
});
