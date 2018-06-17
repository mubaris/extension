import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider, Form, Radio } from 'antd';

const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

class SettingsDisplay extends Component {
  constructor(props) {
    super(props);
    this.onChangeSlider = this.onChangeSlider.bind(this);
    this.onChangeMetric = this.onChangeMetric.bind(this);
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
  render() {
    return (
      <div>
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
          </RadioGroup>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Background"
        >
          <RadioGroup value={this.props.progress.metric} onChange={this.onChangeMetric}>
            <Radio value="year">Year</Radio>
            <Radio value="month">Month</Radio>
            <Radio value="week">Week</Radio>
            <Radio value="day">Day</Radio>
          </RadioGroup>
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