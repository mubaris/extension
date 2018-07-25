import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import { Modal, notification, Icon } from 'antd';

import SettingsDisplay from '../settingsDisplay';

class Config extends Component {
  constructor(props) {
    super(props)
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }
  handleVisibleChange() {
    this.props.dispatch({ type: 'SETTINGS_TOGGLE' });
    if (this.props.settings.visible) {
      this.openNotificationWithIcon('success');
    }
  }
  openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Success',
      description: 'Settings Saved',
    });
  };
  render() {
    return (
      <div>
        <span className="config__button" onClick={this.handleVisibleChange}>
          <Icon type="setting" style={{ fontSize: '200%' }} />
        </span>
        <Modal
          width="60vw"
          style={{ top: 20 }}
          visible={this.props.settings.visible}
          title="Settings"
          onOk={this.handleVisibleChange}
          onCancel={this.handleVisibleChange}
          footer={[
            <a href="https://buymeacoff.ee/mubaris" target="_blank" rel="noopener noreferrer">
              <img src="bmc.png" alt="Buy Me A Coffee" />
            </a>
          ]}
        >
          <SettingsDisplay />
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Config);
