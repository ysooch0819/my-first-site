// 1. 주소에서 id 가져오기
const params = new URLSearchParams(window.location.search);
const postId = parseInt(params.get("id"));

// 2. 게시글 불러오기
const posts = loadPosts();
const post = posts.find((p) => p.id === postId);

// 🔒 post 없으면 목록으로
if (!post) {
  alert("게시글을 찾을 수 없습니다.");
  location.href = "index.html";
}

// ✅ 댓글 배열 초기화 (없으면 생성)
if (!post.comments) {
  post.comments = [];
}

// 3. 게시글 표시
document.getElementById("post-title").textContent = post.title;
document.getElementById("post-content").textContent = post.content;

// 4. 수정 링크
const editLink = document.getElementById("edit-link");
editLink.href = `write.html?id=${post.id}`;

// ==================
// Level 13: 댓글 기능 확장
// ==================

// 댓글 목록 요소
const commentList = document.getElementById("comment-list");

// 작성자 이름 가져오기 (localStorage에 임시 저장)
let username = localStorage.getItem("username");
if (!username) {
  username = prompt("댓글 작성자 이름을 입력하세요") || "익명";
  localStorage.setItem("username", username);
}

// 댓글 렌더링
function renderComments() {
  commentList.innerHTML = "";

  post.comments.forEach((comment, index) => {
    const li = document.createElement("li");

    // 댓글 텍스트 + 작성자 + 시간
    li.textContent = `[${comment.author}] ${comment.text} (${new Date(comment.createdAt).toLocaleString()})`;

    // 본인 댓글이면 수정/삭제 버튼 추가
    if (comment.author === username) {
      const editBtn = document.createElement("button");
      editBtn.textContent = "수정";
      editBtn.style.marginLeft = "5px";
      editBtn.addEventListener("click", () => {
        const newText = prompt("댓글을 수정하세요", comment.text);
        if (newText !== null && newText.trim() !== "") {
          post.comments[index].text = newText.trim();
          savePosts(posts);
          renderComments();
        }
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.style.marginLeft = "5px";
      deleteBtn.addEventListener("click", () => {
        if (confirm("댓글을 삭제하시겠습니까?")) {
          post.comments.splice(index, 1);
          savePosts(posts);
          renderComments();
        }
      });

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    }

    commentList.appendChild(li);
  });
}

renderComments();

// 댓글 등록
const commentAuthorInput = document.getElementById("comment-author");
const commentInput = document.getElementById("comment-input");
const commentBtn = document.getElementById("comment-btn");

commentBtn.addEventListener("click", () => {
  const author = commentAuthorInput.value.trim() || "익명";
  const text = commentInput.value.trim();
  if (!text) return;

  // 댓글 객체 추가
  post.comments.push({
    author,
    text,
    createdAt: new Date().toISOString()
  });

  savePosts(posts);

  commentInput.value = "";
  renderComments();
});
