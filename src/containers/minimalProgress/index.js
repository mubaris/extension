import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
// import ga from '../../analytics';
// import t from '../../i18n';
 import moment from 'moment';

class MinimalProgress extends Component {
  constructor(props) {
    super(props);
    this.clickIt = this.clickIt.bind(this);
  }
  openNotificationWithIcon = (type, send) => {
    notification[type]({
      message: 'Alert',
      description: send,
    });
  };
  clickIt() {
    this.props.dispatch({ type: 'CLICK_MINIMAL_PROGRESS' })
  }
  componentDidMount() {
    setInterval(() => {
      this.props.dispatch({ type: 'TIME_UPDATE' });
      if (this.props.progress.percent < 0) {
        this.props.dispatch({ type: 'METRIC_CHANGE', value: 'year' });
        this.openNotificationWithIcon('info', "Custom progress hasn't started yet");
      } else if (this.props.progress.percent > 100) {
        this.props.dispatch({ type: 'METRIC_CHANGE', value: 'year' });
        this.openNotificationWithIcon('info', "Custom progress has ended");
      }
    }, 1000);
  }
  render() {
    // const metric = this.props.progress.metric;
    // let displayMetric = this.translate(metric.charAt(0).toUpperCase() + metric.slice(1).toLowerCase());
    // if (metric === 'custom') {
    //   displayMetric = this.props.progress.custom_title;
    // }
    let num = parseFloat(this.props.progress.percent).toFixed(1) || 0.0;
    // console.log(typeof this.props.progress.percent);
    if (isNaN(num)) {
      num = 0.0;
    }
    let x = '';
    if (this.props.progress.minimal === 'progress') {
      x = `${num} %`;
    }
    if (this.props.progress.minimal === 'time') {
      x = moment().format('LT');
    }
    return (
      <div style={{ height: '100%' }} className="center__bar">
        {/* <h1 className="white header__progress" onClick={this.clickMetric}>
          {displayMetric}<span>{this.translate('Progress')}</span>
        </h1>
        <div style={{ height: '8%', width: '100%' }} className="progress__bar">
          <Line
            percent={this.props.progress.percent}
            strokeWidth={1}
            strokeColor="#ffffff"
            trailColor="#2db7f500"
            strokeLinecap="square"
            style={progressStyles}
          />
        </div> */}
        <h1 className="percent dark" style={{cursor: 'pointer'}} onClick={this.clickIt}>{x}</h1>
        <h2 className="subtitle dark">{this.props.progress.custom_subtitle}</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(MinimalProgress);
