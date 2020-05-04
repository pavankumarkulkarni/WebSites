//add event listener
document.getElementById('getJokes').addEventListener('click',retrieveJokes);

function retrieveJokes(e){
  const numJokes= document.getElementById('number').value;

  let xrh = new XMLHttpRequest();
  xrh.open('GET',
          `http://api.icndb.com/jokes/random/${numJokes}`,
          true);

  xrh.onload = function(){
    if(this.status === 200){
      let response = JSON.parse(this.responseText);
      let op = '';
      if(response.type === 'success'){
      response.value.forEach(function(joke){
        op += `
        <li>${joke.joke}</li>
        `;
      });}
      else{
        op += 'No joke. Something went wrong in retreiving jokes';
      }
      document.querySelector('.jokesList').innerHTML = op;
    }
  };
  xrh.send();
  e.preventDefault();
}