import React, { Component } from 'react';
import { Layout } from 'antd';
import axios from 'axios';
import moment from 'moment';

import 'antd/dist/antd.css';
import images from './constants/images';
import logo from './logo.svg';
import './App.css';

const { Header, Footer, Content } = Layout;


const tempImg = images[Math.floor(Math.random()*images.length)];

class App extends Component {
  constructor(props) {
    super(props);
    this.imageUrl = tempImg.image;
  }
  componentDidMount() {
    const day = moment().format("YYYYMMDD");
    axios.get(`https://api.eternityapp.co/v1/images/${day}`)
      .then((res) => {
        let imageUrl = res.data.image + `&w=${window.screen.width + 250}`;
        const bg = new Image();
        bg.src = imageUrl;
        bg.onload = () => {
          console.log(imageUrl);
          this.imageUrl = imageUrl;
        };
      })
      .catch(() => {});
  }
  render() {
    return (
      <div className="container__layout" style={{ backgroundImage: `url(${this.imageUrl})` }}>
        <Layout className="layout">
          <Header className="layout__header">Header</Header>
          <Content style={{ textAlign: 'center' }} className="layout__content">Content</Content>
          <Footer className="layout__footer">Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
