import React, { Component } from 'react';
import { connect } from 'react-redux';

class Time extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.dispatch({ type: 'TIME_UPDATE' });
    }, 1000);
  }
  render() {
    return (
      <span>
        {this.props.time.time}
      </span>
    )
  }
}

function mapStateToProps(state) {
  // return {
  //   percent: state.percent,
  //   metric: state.metric,
  //   decimal: state.decimal
  // };
  return {
    time: state.time
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Time);
