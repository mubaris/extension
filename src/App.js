import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import Progress from './containers/progress';
import Quote from './containers/quote';
import Time from './containers/time';
import Config from './containers/config';
import Accounts from './containers/accounts';
import gradient from './constants/gradients';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;


class App extends Component {
  componentDidMount() {
    const day = moment().format("YYYYMMDD");
    const localDay = localStorage.getItem('date');
    if (localDay !== day) {
      axios.get(`https://api.eternityapp.co/v1/images/${day}`)
        .then((res) => {
          let imageUrl = res.data.image + `&w=${window.screen.width + 500}`;
          const bg = new Image();
          bg.src = imageUrl;
          bg.onload = () => {
            console.log(imageUrl);
            this.props.dispatch({ type: 'BG_IMAGE_FETCH', data: res.data });
          };
        })
        .catch(() => {});
    }
  }
  render() {
    let style = {
      backgroundImage: `url(${this.props.imageUrl.image.image})`,
    }; 
    if (this.props.imageUrl.type === 'image') {
      style = {
        backgroundImage: `url(${this.props.imageUrl.image.image})`,
      };
    } else if (this.props.imageUrl.type === 'gradient') {
      style = {
        backgroundImage: gradient,
      };
    }
    return (
      <div className="container__layout" style={ style }>
        <Layout className="layout">
          <Header className="layout__header">
            <Row type="flex" justify="space-between" align="top" style={{ height: "100%" }}>
              <Col span={4}>
                <Config style={{ padding: 0 }} />
              </Col>
              <Col span={4}>
                <Accounts />
              </Col>
            </Row>
          </Header>
          <Content style={{ textAlign: 'center' }} className="layout__content">
            <Row type="flex" align="middle" className="full__height">
              <Col span={12} offset={6} className="full__height center__content">
                <Progress />
              </Col>
            </Row>
          </Content>
          <Footer className="layout__footer">
            <Row type="flex" align="bottom" style={{ height: "100%" }}>
              <Col span={6} style={{ textAlign: 'left' }}>
                <Time />
              </Col>
              <Col span={12} style={{ textAlign: 'center' }}>
                <Quote />
              </Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                <a href="https://twitter.com/Mubaris_NK" target="_blank" rel="noopener noreferrer" className="author__text">Made with ♥ by Mubaris NK</a>
              </Col>
            </Row>
          </Footer>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageUrl: state.imageUrl
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
