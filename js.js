//api.github.com/users/easylearningdb/repos

// fetch(`https://api.github.com/users/andrew`).then((res) => {
//     return res.json().then(data => console.log(data))
// }).catch(err => console.log(err))

const CLIENT_ID = `7bf682999a06c77e629c`;
const CLIENT_SECRET = `9fed82c9385b522600844e38370b6b96c447b2f6`;

async function getUser(name) {
  console.log("name", name);
  const res = await fetch(
    `https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  );

  const profile = await res.json();
  return profile;
}

async function getRepos(profile) {
  const res = await fetch(
    `${profile.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=10`
  );
  const repo = await res.json();
  return repo;
}

document
  .querySelector(".header-content")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let userName = document.querySelector(".header-input").value;
    if(userName.length > 0) {
        const profile = await getUser(userName);
        if(profile?.message === "Not Found") {

            console.log("in not found")
            document.querySelector(".loading").style.display = "block"
        }else {
            const repos = await getRepos(profile);
            showRepo(repos);
            showProfile(profile);
        }
    }
    console.log(profile)

  });

function showProfile(profile) {
  console.log(profile);
  return (document.querySelector(".side").innerHTML = `
    <img src="${profile?.avatar_url}" alt="${profile?.name}" class="user-img"/>
    <h2 class="user-name">${profile?.name}</h2>
    <h3 class="user-education">${profile?.login}</h3>
    <div class="user-social-media">
        <div>followers ${profile?.followers}</div>
        <div>following ${profile?.following}</div>
    </div>
    <p class="user-city">city</p>
    <p class="user-location">${profile?.location}</p>
    `);
}

function showRepo(repos) {
    let newHtml = "";
  for (let repo of repos) {
    newHtml += `
    <div class="main-content">
    <div class="main-title">
    <a href="${repo?.html_url}" class="main-title-text">${repo?.name}</a>
</div>
<div class="main-details">
    <div>${repo?.language}</div>
    <div>score ${repo?.watchers}</div>
    <div>${repo?.forks_count}</div>
</div>
</div>
    `;
  }

  document.querySelector(".main-container").innerHTML = newHtml
}
