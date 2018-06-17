import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import { Popover } from 'antd';

import SettingsDisplay from '../settingsDisplay';

const display = (
  <div style={{height: '300px', width: '600px'}}>
    <SettingsDisplay />
  </div>
);

class Config extends Component {
  constructor(props) {
    super(props)
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }
  handleVisibleChange() {
    this.props.dispatch({ type: 'SETTINGS_TOGGLE' });
  }
  render() {
    return (
      <Popover
        content={display}
        placement="bottomLeft"
        trigger="click"
        visible={this.props.settings.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <span className="config__button">
          <FontAwesomeIcon icon={faCogs} size="2x" />
        </span>
      </Popover>
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

export default connect(mapStateToProps, mapDispatchToProps)(Config);
