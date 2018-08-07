import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import { Modal, Button, Tabs, notification, Icon, Card, Input, Row, Col, Popover, Radio } from 'antd';

import Signup from '../signup';
import Signin from '../signin';
import { subscriptionStatus } from '../../utilities';
import ga from '../../analytics';

import calendar from './calendar.svg';

const TabPane = Tabs.TabPane;

// const InputButton = Input.Search;

class AccountsDisplay extends Component {
  constructor(props) {
    super(props);
    this.onSwitch = this.onSwitch.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleCouponChange = this.handleCouponChange.bind(this);
    this.openPricing = this.openPricing.bind(this);
    this.state = { coupon: '', pricing: false, amount: '$20', unit: '/y' };
  }
  onSwitch(e) {
    const checked = e.target.value === 'y';
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    ga.set({ userId: user.user.email });
    if (checked) {
      this.setState({ amount: '$20', unit: '/y' });
      ga.event({
        category: 'Accounts',
        action: 'Switch to Yearly',
        label: 'FREE - User'
      });
    }
    else {
      this.setState({ amount: '$3', unit: '/mo' });
      ga.event({
        category: 'Accounts',
        action: 'Switch to Monthly',
        label: 'FREE - User'
      });
    }
  }
  closePopup() {
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    ga.set({ userId: user.user.email });
    ga.event({
      category: 'Accounts',
      action: 'Open Pricing',
      label: 'FREE - User'
    });
    this.props.closeSide();
    this.openPricing();
  }
  clickSubscribe() {
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    ga.set({ userId: user.user.email });
    ga.event({
      category: 'Accounts',
      action: 'Open Paddle',
      label: 'FREE - User'
    });
  }
  openPricing() {
    const curr = this.state.pricing;
    this.setState({ pricing: !curr });
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
      let url = `https://checkout.paddle.com/checkout/product/535768?guest_email=${user.email}&passthrough=${user.email}&coupon=${this.state.coupon}`;
      if (this.state.unit === '/mo') {
        url = `https://checkout.paddle.com/checkout/product/535700?guest_email=${user.email}&passthrough=${user.email}&coupon=${this.state.coupon}`;
      }
      return (
        <div>
          <Card title="Details" extra={<Button onClick={() => {this.props.clickSignOut()}}>Sign Out</Button>}>
            <p style={{ color: '#000' }}>Name: {user.username}</p>
            <p style={{ color: '#000' }}>Email: {user.email}</p>
            <p style={{ color: '#000' }}>Package: {this.props.pack}</p>
            {/* {showButton && <Row gutter={8}><Col span={12}><Input placeholder="Discount Code!" onChange={this.handleCouponChange}/></Col><Col span={12}><Button href={url} type="primary" target="_blank">Upgrade to Pro! $3/m</Button></Col></Row>} */}
            {
              showButton && <div><Button type="primary" onClick={() => this.closePopup()}>UPGRADE!</Button>
                <Modal title="Get Eternity Pro" className="modal__contents" style={{ backgroundColor: "#c56cd6" }} width="60vw" footer={null} visible={this.state.pricing} onCancel={() => this.openPricing()} onOk={() => this.openPricing()} >
                  <Row type="flex" justify="center">
                    <Col span={12}>
                      <img width="75%" src={calendar} alt="Time Management Illustration" />
                      <br />
                      <Row className="pricing__modal" style={{ paddingTop: '50px' }} gutter={8}><Col span={12}><Input placeholder="Discount Code!" onChange={this.handleCouponChange}/></Col><Col span={12}><Button onClick={this.clickSubscribe} href={url} type="primary" target="_blank">SUBSCRIBE</Button></Col></Row>
                    </Col>
                    <Col span={12}>
                      <p style={{ textAlign: "center", margin: 0 }} ><span style={{ fontSize: '750%', color: "#c56cd6" }} >{this.state.amount}</span><span style={{ color: "#c56cd6", fontSize: "200%" }} >{this.state.unit}</span></p>
                      <div style={{ textAlign: "center", fontSize: "150%", paddingBottom: "25px" }} >
                        <Radio.Group onChange={this.onSwitch} buttonStyle="solid" defaultValue="y">
                          <Radio.Button value="y"><span className="hoverable">Pay Yearly</span></Radio.Button>
                          <Radio.Button value="m"><span className="hoverable">Pay Monthly</span></Radio.Button>
                        </Radio.Group>
                      </div>
                      <ul style={{ fontSize: "120%" }}>
                        <li><span>Progress bars with custom intervals.</span></li>
                        <li><span>Be reminded about what's important with subtitles.</span></li>
                        <li><span>Choose start hour of the day.</span></li>
                        <li><span>Choose start day of the Week.</span></li>
                      </ul>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col span={24}>
                      Details
                    </Col>
                  </Row> */}
                </Modal>
              </div>
            }
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
          content={<AccountsDisplay closeSide={this.handleVisibleChange} isLoggedIn={this.isLoggedIn()} clickSignOut={this.signOut} pack={this.getPackageDetails()} />}
          visible={this.props.accounts.visible}
          title="Accounts"
          trigger="click"
          onVisibleChange={this.handleVisibleChange}
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
