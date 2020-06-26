import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super()
    this.state ={
      topText:'',
      bottomText:'',
      randomImg:'https://i.imgflip.com/1bij.jpg',
      allMemeImages:'',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => {
        this.setState({
          allMemeImages:data.data.memes
        })
      })
      }
    
    handleChange(event){
      const {name, value} = event.target
      this.setState({
        [name]:value
      })
    }

    handleSubmit(event){
      const nextPic = Math.floor(Math.random()*
                                  this.state.allMemeImages.length)
      const nextPicURL = this.state.allMemeImages[nextPic].url
      this.setState({
        randomImg:nextPicURL
      })
      event.preventDefault()
    }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text' 
            name='topText' 
            placeholder='Top text...'
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input 
            type='text' 
            name='bottomText' 
            placeholder='Bottom text...'
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button name="submit" className='btn'>Gen</button>
        </form>
        <div className='memeArea'>
            <img src={this.state.randomImg} alt=""/>
            <h2 className='topText'> {this.state.topText}</h2> 
            <h2 className='bottomText'> {this.state.bottomText}</h2>             
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
