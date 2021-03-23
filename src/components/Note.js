import { Component } from 'react'

class Note extends Component{
  render(){
    const styling = 
      this.props.isActive ? 
        {backgroundImage: `linear-gradient(rgba(${this.props.color[1]}, 1), rgba(${this.props.color[0]}, 1)`} : 
        {backgroundImage: `linear-gradient(rgba(${this.props.color[1]}, 1), rgba(${this.props.color[1]}, 1)`}
    return(
      <button 
      style={styling} 
      onClick={this.props.onClick}
      className={this.props.className}>
      {/* {this.props.note} */}
      </button>
    )
  }

}

export default Note