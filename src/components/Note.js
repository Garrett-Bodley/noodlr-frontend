import { Component } from 'react'

class Note extends Component{
  render(){
    const className = this.props.isActive ? 'note note-is-active' : 'note'
    const styling = this.props.isActive ? {backgroundImage: `linear-gradient(rgba(${this.props.color[1]}, 1), rgba(${this.props.color[0]}, 1)`} : {backgroundImage: `linear-gradient(rgba(${this.props.color[1]}, 1), rgba(${this.props.color[1]}, 1)`}
    return(
      <button 
      style={styling} 
      onClick={this.props.onClick}
      className={className}>
      {/* {this.props.note} */}
      </button>
    )
  }

}

export default Note