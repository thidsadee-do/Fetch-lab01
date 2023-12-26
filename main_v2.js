// fetch('https://jsonplaceholder.typicode.com/users')
// .then(resp => {
//     console.log(resp);
//     return resp.json();
// }).then( data => {
//     console.log(data);
//     console.log(typeof data);
//     console.log(data[0]);
//     console.log(data[0].name);
//     return data;
// } )

const userList = document.querySelector('.user-list');
const userPost = document.querySelector('.post-info');

function makeElement(tag, attr_n, attr_v, content) {
  let output = document.createElement(tag);
  (!!attr_n) && output.setAttribute(attr_n, attr_v);
  output.textContent = content;
  return output;
}

// Function to fetch and display posts for a specific user
function fetchUserPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(resp => resp.json())
    .then(posts => {
      userPost.innerHTML = ''; // Clear previous posts
      posts.forEach(post => {
        const postElement = makeElement('div', 'class', 'post', `${post.title}: ${post.body}`);
        userPost.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error fetching posts:', error));
}

// Fetch and display users
fetch('https://jsonplaceholder.typicode.com/users')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(user => {
      const li = makeElement('li', 'class', `${user.id}`, `${user.id} | ${user.name} | ${user.email}`);
      userList.appendChild(li);

      // Add click event listener to each user list item
      li.addEventListener('click', () => {
        // Fetch and display posts for the clicked user
        fetchUserPosts(user.id);
      });
    });
  })
  .catch(error => console.error('Error fetching users:', error));


