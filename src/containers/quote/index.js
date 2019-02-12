import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';

import ga from '../../analytics';

class Quote extends Component {
  constructor(props) {
    super(props);
    this.tweetQuote = this.tweetQuote.bind(this);
  }
  tweetQuote() {
    const user = JSON.parse(localStorage.getItem('ACCOUNT'));
    if (user) {
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Quote',
        action: 'Click Tweet',
        label: `${localStorage.getItem('PACKAGE')} - User`
      });
    } else{
      ga.event({
        category: 'Quote',
        action: 'Click Tweet',
        label: 'FREE - Guest'
      });
    }
    const content = '?text="' + this.props.quote.quote + '" - ' + this.props.quote.author + '&via=theEternityApp';
    const url = 'https://twitter.com/intent/tweet' + content;
    window.open(url, '_blank', 'height=500,width=500');
  }
  componentDidMount() {
    // console.log(this.props.quote.quote);
    axios.get('https://api.eternityapp.co/v1/quotes/random')
      .then((res) => {
        this.props.dispatch({ type: 'COLLECT_QUOTE', data: res.data });
      })
      .catch(() => {});
  }
  render() {
    return (
      <div className="quote__space">
        <em>{`"${this.props.quote.quote}"`}</em>
        <span className="quote__author">
          {this.props.quote.author} <FontAwesomeIcon icon={faTwitter} size="sm" style={{cursor: "pointer"}} onClick={this.tweetQuote} />
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // return {
  //   percent: state.percent,
  //   metric: state.metric,
  //   decimal: state.decimal
  // };
  return {
    quote: state.quote
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quote);