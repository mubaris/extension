import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider, Form, Radio, DatePicker, Badge } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

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

class SettingsDisplay extends Component {
  constructor(props) {
    super(props);
    this.onChangeSlider = this.onChangeSlider.bind(this);
    this.onChangeMetric = this.onChangeMetric.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
  }
  onRangeChange(date, dateString) {
    console.log(date, dateString);
    this.props.dispatch({
      type: 'NEW_CUSTOM_PROGRESS',
      date,
      dateString
    });
  }
  onChangeSlider(value) {
    this.props.dispatch({
      type: 'DECIMAL_CHANGE',
      value
    });
  }
  onChangeMetric(e) {
    this.props.dispatch({
      type: 'METRIC_CHANGE',
      value: e.target.value
    });
  }
  onChangeType(e) {
    this.props.dispatch({
      type: 'BG_TYPE_CHANGE',
      value: e.target.value
    });
  }
  render() {
    let datepicker = '';
    if (this.props.progress.custom_start) {
      datepicker = (<RangePicker 
        showTime={{ format: 'HH:mm' }}
        format={dateFormat}
        placeholder={['Start Time', 'End Time']}
        defaultValue={[moment(this.props.progress.custom_start, dateFormat), 
          moment(this.props.progress.custom_end, dateFormat)]}
        onChange={this.onRangeChange} 
        />);
    } else {
      datepicker = (<RangePicker 
        showTime={{ format: 'HH:mm' }}
        format={dateFormat}
        placeholder={['Start Time', 'End Time']}
        onChange={this.onRangeChange} 
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
            <Radio value="custom">Custom <Badge count="Pro" style={{ backgroundColor: '#52c41a' }} /></Radio>
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
          </RadioGroup>
        </Form.Item>
        <h3>Custom Progress Bar <Badge count="Pro" style={{ backgroundColor: '#52c41a' }} /></h3>
        <Form.Item
          {...formItemLayout}
          label="Interval"
        >
          {datepicker}
        </Form.Item>
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