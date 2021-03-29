import React, { Component } from 'react'
import NoiseMaker from '../components/Noisemaker'
import { connect } from 'react-redux'
import { createVamp } from '../actions/vampActions'


class NoisemakerContainer extends Component {

  render(){
    return(
      <div id="noisemakerContainer">
        <NoiseMaker createVamp={this.props.createVamp} />
      </div>
    )
  }

}

// const mapStateToProps = (state) => {
// }

const mapDispatchToProps = (dispatch) => ({
  createVamp: () => dispatch(createVamp)
})

export default connect(null, mapDispatchToProps)(NoisemakerContainer)