const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
  const title = document.getElementById("title-input").value;
  const content = document.getElementById("content-input").value;

  if (!title || !content) {
    alert("제목과 내용을 입력하세요");
    return;
  }

  const newPost = {
    id: posts.length + 1,
    title: title,
    summary: content,
  };

  posts.push(newPost);

  alert("글이 저장되었습니다 (새로고침하면 사라짐)");
  window.location.href = "index.html";
});
