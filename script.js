console.log(posts);

function sayHello() {
  alert("눌렀다!");
}

const postList = document.getElementById("post-list");

posts.forEach((post) => {
  const li = document.createElement("li");

  const link = document.createElement("a");
  link.href = `post.html?id=${post.id}`;
  link.textContent = post.title;

  li.appendChild(link);
  postList.appendChild(li);
});
