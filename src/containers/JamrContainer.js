import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NoiseMaker from "../Noisemaker/Noisemaker";
import "./JamrContainer.css";

class JamrContainer extends Component {
  renderNoiseMaker = () => {
    if (!!this.props.match && this.props.match.path === "/vamps/:id") {
      const vampId = parseInt(this.props.match.params.id);
      return <NoiseMaker vampId={vampId} />;
    } else if (!!this.props.location.search) {
      if (this.props.location.search.substr(0, 6) === "?vamp=") {
        return (
          <NoiseMaker queryString={this.props.location.search.substr(6)} />
        );
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return <NoiseMaker />;
    }
  };

  render() {
    return (
      <div className="container jamr-container">
        <section className="card is-flex is-rounded is-flex-direction-column has-text-centered is-align-items-center">
          <div>
            {this.renderNoiseMaker()}
          </div>
        </section>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  loggedIn: state.loggedIn,
});

export default connect(mapStatetoProps)(JamrContainer);
