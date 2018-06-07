import React, { Component } from 'react';
// import moment from 'moment';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';
// import { Progress } from 'antd';

const progressStyles = {
  width: '100%',
  height: '100%',
  borderStyle: 'solid',
  borderColor: '#ffffff'
};

class ProgressDisplay extends Component {
  constructor(props) {
    super(props);
    this.clickMetric = this.clickMetric.bind(this);
  }
  clickMetric() {
    this.props.dispatch({ type: 'CLICK_METRIC' });
  }
  componentDidMount() {
    setInterval(() => {
      this.props.dispatch({ type: 'TIME_UPDATE' })
    }, 50);
  }
  render() {
    const metric = this.props.progress.metric;
    const displayMetric = metric.charAt(0).toUpperCase() + metric.slice(1).toLowerCase();
    return (
      <div style={{ height: '100%' }} className="center__bar">
        <h1 className="white header__progress" onClick={this.clickMetric}>
          {displayMetric} <span>Progress</span>
        </h1>
        <div style={{ height: '7%' }} className="progress__bar">
          <Line
            percent={this.props.progress.percent}
            strokeWidth={1}
            strokeColor="#ffffff"
            trailColor="#2db7f500"
            strokeLinecap="square"
            style={progressStyles}
          />
        </div>
        <h1 className="percent">{this.props.progress.percent} %</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // return {
  //   percent: state.percent,
  //   metric: state.metric,
  //   decimal: state.decimal
  // };
  return {
    progress: state.progress
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressDisplay);
