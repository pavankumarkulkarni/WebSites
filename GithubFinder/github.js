// Create github class to get data
class Github{
  constructor(){
    this.client_id = 'xxx' //update with ur client id;
    this.client_secret = 'yyy' //update with your secret;
    this.per_page=5;
    this.sort="created:asc";
    }

  async getData(user){
    let response = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
    let profileData = await response.json();
    let repos = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.per_page}&sort=${this.sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
    let reposData = await repos.json();    
    return (
      {
        profile : profileData,
        repos : reposData
      }
    )
  }
}