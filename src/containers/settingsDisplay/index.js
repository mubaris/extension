import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider, Form, Radio, DatePicker, Input, Select, TimePicker } from 'antd';
import moment from 'moment';

// import { subscriptionStatus } from '../../utilities';

import ga from '../../analytics';

const { RangePicker } = DatePicker;

const Option = Select.Option;

const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const style = {
  display: 'flex',
  flexDirection: 'column'
}

const dateFormat = 'YYYY-MM-DD HH:mm';

const weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// const hourArray = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM',
//                     '11AM', '12PM', '1PM', '2PM', ]

class SettingsDisplay extends Component {
  constructor(props) {
    super(props);
    // this.getPackageDetails = this.getPackageDetails.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.onChangeSlider = this.onChangeSlider.bind(this);
    this.onChangeMetric = this.onChangeMetric.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
    this.onWeekdayChange = this.onWeekdayChange.bind(this);
    this.onHourChange = this.onHourChange.bind(this);
    this.clickPro = this.clickPro.bind(this);
  }
  clickPro() {
    // const pack = this.getPackageDetails();
    // const disb = (pack === 'Pro') ? false : true;
    // const disb = false;
    // if (disb) {
    //   const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    //   if (user) {
    //     message.error('You need to Upgrade to Pro to use this feature');
    //     ga.set({ userId: user.user.email });
    //     ga.event({
    //       category: 'Config',
    //       action: 'Click Pro Feature',
    //       label: `${localStorage.getItem('PACKAGE')} - User`,
    //     });
    //   } else {
    //     message.error('Sign in and Upgrade to Pro to use this feature');
    //     ga.event({
    //       category: 'Config',
    //       action: 'Click Pro Feature',
    //       label: 'FREE - Guest',
    //     });
    //   }
    // }
    ga.event({
      category: 'Config',
      action: 'Click Pro Feature',
      label: `FREE - User`,
    });
  }
  onHourChange(time,timeString) {
    this.props.dispatch({ type: 'CHANGE_DAYSTART', time, timeString });
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Config',
        action: 'Change Daystart',
        label: `FREE - User`,
      });
    } else{
      ga.event({
        category: 'Config',
        action: 'Change Daystart',
        label: 'FREE - Guest',
      });
    }
  }
  onWeekdayChange(value) {
    this.props.dispatch({ type: 'CHANGE_WEEKDAY', value });
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Config',
        action: 'Change Weekstart',
        label: `FREE - User`,
      });
    } else{
      ga.event({
        category: 'Config',
        action: 'Change Weekstart',
        label: 'FREE - Guest',
      });
    }
  }
  onChangeSubtitle(e) {
    this.props.dispatch({ type: 'CHANGE_SUBTITLE_CUSTOM', value: e.target.value });
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Config',
        action: 'Change Subtitle',
        label: `FREE - User`,
      });
    } else{
      ga.event({
        category: 'Config',
        action: 'Change Subtitle',
        label: 'FREE - Guest',
      });
    }
  }
  onChangeTitle(e) {
    this.props.dispatch({ type: 'CHANGE_TITLE_CUSTOM', value: e.target.value });
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Config',
        action: 'Change Title',
        label: `FREE - User`,
      });
    } else{
      ga.event({
        category: 'Config',
        action: 'Change Title',
        label: 'FREE - Guest',
      });
    }
  }
  onRangeChange(date, dateString) {
    console.log(date, dateString);
    this.props.dispatch({
      type: 'NEW_CUSTOM_PROGRESS',
      date,
      dateString
    });
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Config',
        action: 'Change Range',
        label: `FREE - User`,
      });
    } else{
      ga.event({
        category: 'Config',
        action: 'Change Range',
        label: 'FREE - Guest',
      });
    }
  }
  onChangeSlider(value) {
    this.props.dispatch({
      type: 'DECIMAL_CHANGE',
      value
    });
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Config',
        action: 'Change Decimal',
        label: `FREE - User`,
        value
      });
    } else{
      ga.event({
        category: 'Config',
        action: 'Change Decimal',
        label: 'FREE - Guest',
        value
      });
    }
  }
  onChangeMetric(e) {
    const value = e.target.value;
    this.props.dispatch({
      type: 'METRIC_CHANGE',
      value
    });
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Config',
        action: `Change Metric to ${value}`,
        label: `FREE - User`,
      });
    } else{
      ga.event({
        category: 'Config',
        action: `Change Metric to ${value}`,
        label: 'FREE - Guest',
      });
    }
  }
  onChangeType(e) {
    const value = e.target.value;
    this.props.dispatch({
      type: 'BG_TYPE_CHANGE',
      value
    });
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Config',
        action: `Change BG to ${value}`,
        label: `FREE - User`,
      });
    } else{
      ga.event({
        category: 'Config',
        action: `Change BG to ${value}`,
        label: 'FREE - Guest',
      });
    }
  }
  isLoggedIn() {
    if (this.props.accounts.userType === 'GUEST') {
      return false;
    } else if (this.props.accounts.userType === 'LOGGEDIN') {
      return true;
    }
    return false;
  }
  // getPackageDetails() {
  //   if (this.isLoggedIn()) {
  //     const pack = this.props.accounts.package;
  //     if (pack === 'FREE') {
  //       return 'Free';
  //     } else if (pack === 'PAID') {
  //       return 'Pro';
  //     } else {
  //       return 'Free';
  //     }
  //   } else {
  //     return 'Free';
  //   }
  // }
  // componentDidMount() {
  //   if (this.isLoggedIn()) {
  //     const account = JSON.parse(localStorage.getItem('ACCOUNT'));
  //     subscriptionStatus(account.user.email)
  //     .then(data => this.props.dispatch({ type: 'SUBSCRIPTION_STATUS', data }))
  //     .catch(reason => console.log(reason.message));
  //   }
  // }
  render() {
    // const pack = this.getPackageDetails();
    // const disb = (pack === 'Pro') ? false : true;
    const disb = false;
    let datepicker = '';
    if (this.props.progress.custom_start) {
      datepicker = (<RangePicker 
        showTime={{ format: 'HH:mm' }}
        disabled={disb}
        format={dateFormat}
        placeholder={['Start Time', 'End Time']}
        defaultValue={[moment(this.props.progress.custom_start, dateFormat), 
          moment(this.props.progress.custom_end, dateFormat)]}
        onChange={this.onRangeChange} 
        />);
    } else {
      datepicker = (<RangePicker 
        showTime={{ format: 'HH:mm' }}
        disabled={disb}
        format={dateFormat}
        placeholder={['Start Time', 'End Time']}
        onChange={this.onRangeChange} 
      />);
    }
    let timepicker = '';
    if (this.props.progress.custom_hour) {
      timepicker = (<TimePicker 
        format="HH:mm"
        disabled={disb}
        minuteStep={15}
        defaultValue={moment(this.props.progress.custom_hour, "HH")}
        onChange={this.onHourChange} 
        />);
    } else {
      timepicker = (<TimePicker 
        format="HH:mm"
        minuteStep={15}
        disabled={disb}
        onChange={this.onHourChange} 
        />);
    }
    return (
      <div className="modal__contents" style={style}>
        <h3>General Settings</h3>
        <hr/>
        <Form.Item
          {...formItemLayout}
          label="Decimal Points"
        >
          <Slider min={1} max={12} onChange={this.onChangeSlider} value={this.props.progress.decimal} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Progress Metric"
        >
          <RadioGroup value={this.props.progress.metric} onChange={this.onChangeMetric}>
            <Radio value="year">Year</Radio>
            <Radio value="month">Month</Radio>
            <Radio value="week">Week</Radio>
            <Radio value="day">Day</Radio>
            <Radio value="custom" disabled={disb}><span onClick={this.clickPro}>Custom </span></Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Background"
          style={{ flexGrow: 1 }}
        >
          <RadioGroup value={this.props.imageUrl.type} onChange={this.onChangeType}>
            <Radio value="image">Daily Image</Radio>
            <Radio value="gradient">Random Gradient</Radio>
            <Radio value="trianglify">Trianglify</Radio>
          </RadioGroup>
        </Form.Item>
        <h3>Custom Progress Bar</h3>
        <div onClick={this.clickPro}>
          <Form.Item
            {...formItemLayout}
            label="Interval"
          >
            {datepicker}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Title"
          >
            <Input 
              onChange={this.onChangeTitle}
              placeholder="Title of Custom Progress Bar"
              disabled={disb}
              defaultValue={this.props.progress.custom_title}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Subtitle"
          >
            <Input 
              onChange={this.onChangeSubtitle}
              placeholder="Subtitle"
              disabled={disb}
              defaultValue={this.props.progress.custom_subtitle}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Start of the week"
          >
            <Select disabled={disb} defaultValue={weekArray[this.props.progress.custom_weekday]} onChange={this.onWeekdayChange}>
              <Option value={0}>Sunday</Option>
              <Option value={1}>Monday</Option>
              <Option value={2}>Tuesday</Option>
              <Option value={3}>Wednesday</Option>
              <Option value={4}>Thursday</Option>
              <Option value={5}>Friday</Option>
              <Option value={6}>Saturday</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Start of the day"
          >
            {timepicker}
          </Form.Item>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDisplay);