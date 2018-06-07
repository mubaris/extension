import React, { Component } from 'react';
import { Layout } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;


class App extends Component {
  componentDidMount() {
    const day = moment().format("YYYYMMDD");
    axios.get(`https://api.eternityapp.co/v1/images/${day}`)
      .then((res) => {
        let imageUrl = res.data.image + `&w=${window.screen.width + 250}`;
        const bg = new Image();
        bg.src = imageUrl;
        bg.onload = () => {
          console.log(imageUrl);
          this.props.dispatch({ type: 'BG_IMAGE_FETCH', url: imageUrl });
        };
      })
      .catch(() => {});
  }
  render() {
    const style = {
      backgroundImage: `url(${this.props.imageUrl.imageUrl})`,
    };
    return (
      <div className="container__layout" style={ style }>
        <Layout className="layout">
          <Header className="layout__header">Header</Header>
          <Content style={{ textAlign: 'center' }} className="layout__content">Content</Content>
          <Footer className="layout__footer">Footer</Footer>
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
