import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Alert } from 'antd';

const FormItem = Form.Item;

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // if (values.username.length < 4) {
        //   this.props.dispatch({ type: 'SIGNUP_ERROR', error: "Name should be at least 4 letters long!" });
        // } else {
        //   this.props.dispatch({ type: 'SIGNUP_REQUEST', data: values });
        // }
        this.props.dispatch({ type: 'SIGNUP_REQUEST', data: values });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your name (length > 4)!', pattern: /^([a-zA-Z0-9_-]){4,}$/
          }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        {this.props.signup.error && <Alert message={this.props.signup.error} type="error" showIcon /> }
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign Up
          </Button>
        </FormItem>
      </Form>
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

const Signup = Form.create()(SignupForm);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);