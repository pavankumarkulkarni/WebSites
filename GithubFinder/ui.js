class UI {
  constructor() {
    this.profileDiv = document.getElementById('profile');
  }

  displayProfile(user){
    this.profileDiv.innerHTML = `
    <div class="card card-body mb-2">
      <div class="row">
        <div class="col-md-3">
          <img src=${user.avatar_url} class="img-fluid mt-4">
          <a href=${user.html_url} target="_blank" class="mt-2 btn btn-primary btn-block"> View Profile </a> 
        </div>         
        <div class="col-md-9">
          <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <ul class="list-group">
          <li class="list-group-item">Company: ${user.company} </li>
          <li class="list-group-item">Website/Blog: ${user.blog} </li>
          <li class="list-group-item">Location: ${user.location}</li>
          <li class="list-group-item">Member since: ${user.created_at}</li>
        </ul>          
        </div>     
      </div>
    </div>
    <h3 class="page-heading"> Latest Repos </h3>
    <div id="repos">

    </div>
    `;
  }

  clearProfile(){
    this.profileDiv.innerHTML = '';
  }

  alertMessage(msg){
    this.clearProfile();
    this.profileDiv.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${msg}
    </div>`;
  }

  displayRepos(repos){
    const repoDiv = document.getElementById('repos');
    let out = '';
    console.log(repos);
    repos.forEach(repo => {
      out += `
      <div class="card card-body mb-2">
      <div class="row">
        <div class="col-md-7">
          <a href=${repo.html_url} target="_blank" class="btn btn-link"> ${repo.name} </a> 
        </div>         
        <div class="col-md-5">
          <span class="badge badge-primary">Stargazers: ${repo.stargazers_count}</span>
          <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
          <span class="badge badge-success">Forks: ${repo.forks_count}</span>
        </ul>          
        </div>     
      </div>
      <div class = row>
        <p class="small text-justify px-4"> <b> Description : </b> ${repo.description} </p>
      </div>
    </div>      
      
      `;
      // console.log(repo.name);
      // console.log(repo.html_url);
      // console.log(repo.stargazers_count);
      // console.log(repo.watchers_count);
      // console.log(repo.forks_count);
    })
    repoDiv.innerHTML = out;
  }
}