const postList = document.getElementById("post-list");
const posts = loadPosts();

function renderPosts() {
  postList.innerHTML = "";

  posts.forEach((post) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = `post.html?id=${post.id}`;
    link.textContent = post.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.style.marginLeft = "10px";

    delBtn.addEventListener("click", () => {
      if (!confirm("정말 삭제할까요?")) return;

      const index = posts.findIndex((p) => p.id === post.id);
      posts.splice(index, 1);
      savePosts(posts);
      renderPosts();
    });

    li.appendChild(link);
    li.appendChild(delBtn);
    postList.appendChild(li);
  });
}

renderPosts();
