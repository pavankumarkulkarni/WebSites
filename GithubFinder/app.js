//Instantiate Github Class
const github = new Github;

//Instantiate UI class
const ui = new UI;

//Identify user name search input and add event listener
const userSearchEL = document.getElementById('usernameSearch');
userSearchEL.addEventListener('keyup', ((e) => {
  const user = e.target.value;
  if (user !== '') {
    github.getData(user)
      .then(data => {
        if (data.profile.message !== 'Not Found') {
          ui.displayProfile(data.profile);
          ui.displayRepos(data.repos);
        } else {
          ui.alertMessage('No user Found!');
        }

      })
  }else{
    ui.clearProfile();
  }
}))