import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';
import { notification } from 'antd';
import ga from '../../analytics';
//  import moment from 'moment';

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

    // const addit = moment.duration("22:00");
    // const start = moment().startOf('day').add(addit);
    // const end = moment().endOf('day').add(addit);
    // const now = moment();
    // // console.log(start, end);
    // const duration = moment.duration(now.diff(start)).asMilliseconds();
    // const total = moment.duration(end.diff(start)).asMilliseconds();
    // let percent = duration * 100 / total;
    // const out = percent.toFixed(2);
    // console.log(start, end, out);

    // const x = 3;
    // const neg =  x - 7;
    // const addit = moment.duration("06:00");
    // const start = moment().day(neg).startOf('day').add(addit);
    // const end = moment().day(x).startOf('day').add(addit);
    // const now = moment();
    // // console.log(start, end);
    // const duration = moment.duration(now.diff(start)).asMilliseconds();
    // const total = moment.duration(end.diff(start)).asMilliseconds();
    // let percent = duration * 100 / total;
    // if (percent > 100) {
    //   percent = percent - 100;
    // }
    // const out = percent.toFixed(2);
    // console.log(start, end, out);
  }
  openNotificationWithIcon = (type, send) => {
    notification[type]({
      message: 'Alert',
      description: send,
    });
  };
  clickMetric() {
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Progress',
        action: 'Change Progress',
        label: `${localStorage.getItem('PACKAGE')} - User`
      });
    } else{
      ga.event({
        category: 'Progress',
        action: 'Change Progress',
        label: 'FREE - Guest'
      });
    }
    this.props.dispatch({ type: 'CLICK_METRIC' });
  }
  componentDidMount() {
    setInterval(() => {
      this.props.dispatch({ type: 'TIME_UPDATE' });
      if (this.props.progress.percent < 0) {
        this.props.dispatch({ type: 'METRIC_CHANGE', value: 'day' });
        this.openNotificationWithIcon('info', "Custom progress hasn't started yet");
      } else if (this.props.progress.percent > 100) {
        this.props.dispatch({ type: 'METRIC_CHANGE', value: 'day' });
        this.openNotificationWithIcon('info', "Custom progress has ended");
      }
    }, 50);
  }
  render() {
    const metric = this.props.progress.metric;
    let displayMetric = metric.charAt(0).toUpperCase() + metric.slice(1).toLowerCase();
    if (metric === 'custom') {
      displayMetric = this.props.progress.custom_title;
    }
    return (
      <div style={{ height: '100%' }} className="center__bar">
        <h1 className="white header__progress" onClick={this.clickMetric}>
          {displayMetric} <span>Progress</span>
        </h1>
        <div style={{ height: '8%', width: '80%' }} className="progress__bar">
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
        <h2 className="subtitle">{this.props.progress.custom_subtitle}</h2>
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
