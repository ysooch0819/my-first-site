function sayHello() {
  alert("눌렀다!");
}

const postList = document.getElementById("post-list");

posts.forEach((post) => {
  const li = document.createElement("li");
  li.textContent = post.title + " - " + post.summary;
  postList.appendChild(li);
});
