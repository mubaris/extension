import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faMugHot } from '@fortawesome/free-solid-svg-icons'
import { Switch } from 'antd';

import ga from '../../analytics';
import './style.css';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.toggleDistractionFreeMode = this.toggleDistractionFreeMode.bind(this);
  }
  toggleDistractionFreeMode(value) {
    this.props.dispatch({
      type: 'TOGGLE_DISTRACTION_FREE_MODE',
      value
    });
    ga.event({
      category: 'Config',
      action: `Toggle Distraction Free Mode ${value}`,
      label: `FREE - User`,
    });
  }
  render() {
    return (
      <div>
        <Switch
          checkedChildren={<FontAwesomeIcon icon={faMugHot} />}
          unCheckedChildren={<FontAwesomeIcon icon={faCoffee} />}
          checked={this.props.distraction.status}
          defaultChecked={false}
          onClick={this.toggleDistractionFreeMode}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
