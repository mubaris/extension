import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import Trianglify from 'trianglify';
import PropTypes from 'prop-types';

import Progress from './containers/progress';
import Quote from './containers/quote';
import Time from './containers/time';
import Config from './containers/config';
import Image from './containers/image';
import Toggle from './containers/toggle';
import MinimalProgress from './containers/minimalProgress';
import gradient from './constants/gradients';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;


class App extends Component {
  componentDidMount() {
    const day = moment().format("YYYYMMDD");
    const localDay = localStorage.getItem('date');
    if (localDay !== day) {
      console.log("C ", day);
      axios.get(`https://api.eternityapp.co/v1/images/${day}`)
        .then((res) => {
          let url = res.data.image + `&w=${window.screen.width + 500}`;
          const bg = document.createElement('img');
          console.log("D ");
          bg.src = url;
          console.log("B ", url);
          bg.onload = () => {
            console.log(url);
            this.props.dispatch({ type: 'BG_IMAGE_FETCH', data: res.data });
          };
        })
        .catch((err) => {
          console.log("E ", err);
          throw err;
        });
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
    } else if (this.props.imageUrl.type === 'trianglify') {
      const pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight
        // variance: 0.7,
        // cell_size: 90
      });
      const tria = `url(${pattern.png()})`;
      style = {
        backgroundImage: tria,
      };
    }
    if (this.props.distraction.status) {
      return (
        <div className="container__layout">
          <Layout className="layout__dark">
            <Header className="layout__header__dark">
              <Row type="flex" justify="space-between" align="top" style={{ height: "100%" }}>
                <Col span={4}>
                  {/* <Config style={{ padding: 0 }} /> */}
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  <Toggle />
                </Col>
              </Row>
            </Header>
            <Content style={{ textAlign: 'center' }} className="layout__content">
              <Row type="flex" align="middle" className="full__height">
                <Col span={18} offset={3} className="full__height center__content">
                  <MinimalProgress />
                </Col>
              </Row>
            </Content>
          </Layout>
        </div>
      )
    } 
    return (
      <div className="container__layout" style={ style }>
        <Layout className="layout">
          <Header className="layout__header">
            <Row type="flex" justify="space-between" align="top" style={{ height: "100%" }}>
              <Col span={4}>
                <Config style={{ padding: 0 }} />
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                <Toggle />
              </Col>
            </Row>
          </Header>
          <Content style={{ textAlign: 'center' }} className="layout__content">
            <Row type="flex" align="middle" className="full__height">
              <Col span={18} offset={3} className="full__height center__content">
                <Progress />
              </Col>
            </Row>
          </Content>
          <Footer className="layout__footer">
            <Row type="flex" align="bottom" style={{ height: "100%" }}>
              <Col span={6} style={{ textAlign: 'left' }}>
                <Image />
              </Col>
              <Col span={12} style={{ textAlign: 'center' }}>
                <Quote />
              </Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                {/* <a href="https://twitter.com/Mubaris_NK" target="_blank" rel="noopener noreferrer" className="author__text">Made with ♥ by Mubaris NK</a> */}
                <Time />
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
    imageUrl: state.imageUrl,
    distraction: state.distraction
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

App.contextTypes = {
  store: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
