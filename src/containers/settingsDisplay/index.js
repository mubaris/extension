import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider, Form, Radio, DatePicker, Input, Select, TimePicker } from 'antd';
import moment from 'moment';

// import { subscriptionStatus } from '../../utilities';

import ga from '../../analytics';
import t from '../../i18n';

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

// const hourArray = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM',
//                     '11AM', '12PM', '1PM', '2PM', ]

class SettingsDisplay extends Component {
  constructor(props) {
    super(props);
    // this.getPackageDetails = this.getPackageDetails.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.onChangeSlider = this.onChangeSlider.bind(this);
    this.onChangeMetric = this.onChangeMetric.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
    this.onWeekdayChange = this.onWeekdayChange.bind(this);
    this.onHourChange = this.onHourChange.bind(this);
    this.clickPro = this.clickPro.bind(this);
    this.getDefaultWeekDay = this.getDefaultWeekDay.bind(this);
    this.translate = this.translate.bind(this);

    this.lang = this.props.progress.language;

    this.weekArray = [
      t(this.props.progress.language, 'Sunday'), 
      t(this.props.progress.language, 'Monday'),
      t(this.props.progress.language, 'Tuesday'),
      t(this.props.progress.language, 'Wednesday'),
      t(this.props.progress.language, 'Thursday'),
      t(this.props.progress.language, 'Friday'),
      t(this.props.progress.language, 'Saturday')
    ];
  }
  getDefaultWeekDay() {
    const weekArray = [
      t(this.props.progress.language, 'Sunday'), 
      t(this.props.progress.language, 'Monday'),
      t(this.props.progress.language, 'Tuesday'),
      t(this.props.progress.language, 'Wednesday'),
      t(this.props.progress.language, 'Thursday'),
      t(this.props.progress.language, 'Friday'),
      t(this.props.progress.language, 'Saturday')
    ];
    return weekArray[this.props.progress.custom_weekday];
  }
  translate(key) {
    return t(this.props.progress.language, key);
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
  onChangeLanguage(e) {
    const value = e.target.value;
    this.props.dispatch({
      type: 'LANGUAGE_CHANGE',
      value
    });
    ga.event({
      category: 'Config',
      action: `Change Language to ${value}`,
      label: 'User',
    });
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
        placeholder={[this.translate('Start Time'), this.translate('End Time')]}
        defaultValue={[moment(this.props.progress.custom_start, dateFormat), 
          moment(this.props.progress.custom_end, dateFormat)]}
        onChange={this.onRangeChange} 
        />);
    } else {
      datepicker = (<RangePicker 
        showTime={{ format: 'HH:mm' }}
        disabled={disb}
        format={dateFormat}
        placeholder={[this.translate('Start Time'), this.translate('End Time')]}
        onChange={this.onRangeChange} 
      />);
    }
    let timepicker = '';
    if (this.props.progress.custom_hour) {
      timepicker = (<TimePicker 
        format="HH:mm"
        minuteStep={15}
        defaultValue={moment(this.props.progress.custom_hour, "HH")}
        placeholder={this.translate('Select Time')}
        onChange={this.onHourChange} 
        />);
    } else {
      timepicker = (<TimePicker 
        format="HH:mm"
        minuteStep={15}
        placeholder={this.translate('Select Time')}
        onChange={this.onHourChange} 
        />);
    }
    return (
      <div className="modal__contents" style={style}>
        <h3><b>{this.translate('General Settings')}</b></h3>
        <hr/>
        <Form.Item
          {...formItemLayout}
          label={this.translate('Language')}
        >
          <RadioGroup value={this.props.progress.language} onChange={this.onChangeLanguage}>
            <Radio value="en">English</Radio>
            <Radio value="ja">日本語</Radio>
            <Radio value="ru">Ру́сский</Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={this.translate('Decimal Points')}
        >
          <Slider min={1} max={12} onChange={this.onChangeSlider} value={this.props.progress.decimal} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={this.translate('Progress Metric')}
        >
          <RadioGroup value={this.props.progress.metric} onChange={this.onChangeMetric}>
            <Radio value="year">{this.translate('Year')}</Radio>
            <Radio value="month">{this.translate('Month')}</Radio>
            <Radio value="week">{this.translate('Week')}</Radio>
            <Radio value="day">{this.translate('Day')}</Radio>
            <Radio value="hour">{this.translate('Hour')}</Radio>
            <Radio value="custom">{this.translate('Custom')}</Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={this.translate('Background')}
          style={{ flexGrow: 1 }}
        >
          <RadioGroup value={this.props.imageUrl.type} onChange={this.onChangeType}>
            <Radio value="image">{this.translate('Daily Image')}</Radio>
            <Radio value="gradient">{this.translate('Random Gradient')}</Radio>
            <Radio value="trianglify">{this.translate('Trianglify')}</Radio>
          </RadioGroup>
        </Form.Item>
        <h3><b>{this.translate('Custom Progress Bar')}</b></h3>
        <div onClick={this.clickPro}>
          <Form.Item
            {...formItemLayout}
            label={this.translate('Interval')}
          >
            {datepicker}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={this.translate('Title')}
          >
            <Input 
              onChange={this.onChangeTitle}
              placeholder={this.translate('Title of Custom Progress Bar')}
              disabled={disb}
              defaultValue={this.props.progress.custom_title}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={this.translate('Subtitle')}
          >
            <Input 
              onChange={this.onChangeSubtitle}
              placeholder={this.translate('Subtitle')}
              disabled={disb}
              defaultValue={this.props.progress.custom_subtitle}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={this.translate('Start of the week')}
          >
            <Select disabled={disb} defaultValue={this.getDefaultWeekDay()} onChange={this.onWeekdayChange}>
              <Option value={0}>{t(this.props.progress.language, 'Sunday')}</Option>
              <Option value={1}>{t(this.props.progress.language, 'Monday')}</Option>
              <Option value={2}>{t(this.props.progress.language, 'Tuesday')}</Option>
              <Option value={3}>{t(this.props.progress.language, 'Wednesday')}</Option>
              <Option value={4}>{t(this.props.progress.language, 'Thursday')}</Option>
              <Option value={5}>{t(this.props.progress.language, 'Friday')}</Option>
              <Option value={6}>{t(this.props.progress.language, 'Saturday')}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={this.translate('Start of the day')}
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