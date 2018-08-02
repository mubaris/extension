import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import { Button, Tabs, notification, Icon, Card, Input, Row, Col, Popover } from 'antd';

import Signup from '../signup';
import Signin from '../signin';
import { subscriptionStatus } from '../../utilities';

const TabPane = Tabs.TabPane;

// const InputButton = Input.Search;

class AccountsDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleCouponChange = this.handleCouponChange.bind(this);
    this.state = { coupon: '' };
  }
  handleCouponChange(event) {
    this.setState({ coupon: event.target.value });
  }
  render() {
    const account = JSON.parse(localStorage.getItem('ACCOUNT'));
    let user = {};
    if (account) {
      user = account.user;
    }
    if (this.props.isLoggedIn) {
      const showButton = (this.props.pack === 'Free');
      // getUserDetails();
      const url = `https://checkout.paddle.com/checkout/product/535700?guest_email=${user.email}&passthrough=${user.email}&coupon=${this.state.coupon}`;
      return (
        <div>
          <Card title="Details" extra={<Button onClick={() => {this.props.clickSignOut()}}>Sign Out</Button>}>
            <p style={{ color: '#000' }}>Name: {user.username}</p>
            <p style={{ color: '#000' }}>Email: {user.email}</p>
            <p style={{ color: '#000' }}>Package: {this.props.pack}</p>
            {showButton && <Row gutter={8}><Col span={12}><Input placeholder="Discount Code!" onChange={this.handleCouponChange}/></Col><Col span={12}><Button href={url} type="primary" target="_blank">Upgrade to Pro! $3/m</Button></Col></Row>}
          </Card>
        </div>
      )
    } else {
      return (
        <div style={{ width: "400px" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Sign Up" key="1"><Signup/></TabPane>
            <TabPane tab="Sign In" key="2"><Signin/></TabPane>
          </Tabs>
        </div>
      );
    }
  }
}

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getPackageDetails = this.getPackageDetails.bind(this);
  }
  handleVisibleChange() {
    this.props.dispatch({ type: 'ACCOUNTS_TOGGLE' });
  }
  signOut() {
    this.props.dispatch({ type: 'LOGOUT' });
  }
  openNotificationWithIcon = (type, data) => {
    notification[type]({
      message: 'Success',
      description: data,
      placement: 'topLeft',
    });
  }
  componentDidMount() {
    if (this.isLoggedIn()) {
      const account = JSON.parse(localStorage.getItem('ACCOUNT'));
      subscriptionStatus(account.user.email)
      .then(data => this.props.dispatch({ type: 'SUBSCRIPTION_STATUS', data }))
      .catch(reason => console.log(reason.message));
    }
  }
  componentDidUpdate(prevProps) {
    if ((prevProps.accounts.userType !== this.props.accounts.userType) && this.props.accounts.userType === 'LOGGEDIN') {
      this.openNotificationWithIcon('success', 'Now you\'re signed in!');
      // console.log('componentDidUpdate', prevProps.accounts.userType, this.props.accounts.userType)
    }
    if ((prevProps.accounts.userType !== this.props.accounts.userType) && this.props.accounts.userType === 'GUEST') {
      this.openNotificationWithIcon('success', 'Now you\'re signed out!');
      // console.log('componentDidUpdate', prevProps.accounts.userType, this.props.accounts.userType)
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
  getPackageDetails() {
    if (this.isLoggedIn()) {
      const pack = this.props.accounts.package;
      if (pack === 'FREE') {
        return 'Free';
      } else if (pack === 'PAID') {
        return 'Pro';
      } else {
        return 'Free';
      }
    } else {
      return 'Free';
    }
  }
  render() {
    let show = <Button style={{ background: '#ffffff00', color: '#ffffff' }}>Signin/Signup</Button>;
    if (this.isLoggedIn()) {
      show = <Icon type="user" style={{ fontSize: '200%' }} />;
    }
    return (
      <div className="accounts__button">
        {/* <div className="accounts__button" onClick={this.handleVisibleChange}>
          {show}
        </div> */}
        <Popover
          placement="rightBottom"
          content={<AccountsDisplay isLoggedIn={this.isLoggedIn()} clickSignOut={this.signOut} pack={this.getPackageDetails()} />}
          visible={this.props.accounts.visible}
          title="Accounts"
          trigger="click"
          onVisibleChange={this.handleVisibleChange}
          footer={[
            <a href="https://buymeacoff.ee/mubaris" target="_blank" rel="noopener noreferrer">
              <img src="bmc.png" alt="Buy Me A Coffee" />
            </a>
          ]}
        >
          {show}
        </Popover>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
