import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoiseMaker from '../components/Noisemaker/Noisemaker'


class JamrContainer extends Component{

  renderNoiseMaker = () => {
    if(!!this.props.match && this.props.match.path === '/vamps/:id'){
      const vampId = parseInt(this.props.match.params.id)
      return <NoiseMaker vampId={vampId} />
    }else{
      return <NoiseMaker />
    }
  }

  render(){
    return(
      <div id="noisemakerContainer">
        {this.renderNoiseMaker()}
      </div>
    )
  }
}

const mapStatetoProps = (state) => ({
  loggedIn: state.loggedIn
})

export default connect(mapStatetoProps)(JamrContainer)