// post.js는 posts.js 에서 어떤 데이터를 가져올지 특정해주는 역할을 수행한다.

// ~~~~/posts.html?id=2 주소의 게시글을 본다고 가정.
// 주소에서 id 를 꺼낸다. 
// params 안에는 id -> 2 라는 정보가 들어있다는 걸 URLSearchParams() 로 분해해서 알게 됨.
const params = new URLSearchParams(window.location.search);
// params의 id에 해당하는 값을 숫자로 변환한다. parseInt()
// 왜? posts 데이터 안의 id 들이 숫자로 되어있기 때문이다.
// postId 는 해당 주소의 id 숫자값이 들어가게 된다.
const postId = parseInt(params.get("id"));

// posts 데이터 안에서 postId 숫자와 일치하는 데이터(게시글)를 찾는다.
// 이 경우 posts 안에서 id가 2 인 데이터를 찾아서 post 값으로 저장한다.
const posts = loadPosts();
const post = posts.find((p) => p.id === postId);

// getElementById() 를 활용해서 해당 post의 title, summary를 가져와서 html의 빈자리에 채운다.
document.getElementById("post-title").textContent = post.title;
document.getElementById("post-content").textContent = post.summary;
document.getElementById("edit-link").href = `edit.html?id=${postId}`;

const editLink = document.getElementById("edit-link");

if (post) {
  editLink.href = `write.html?id=${post.id}`;
}
