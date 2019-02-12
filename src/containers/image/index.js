import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';

class Image extends Component {
    render() {
        if (this.props.imageUrl.type === 'image') {
            const author = this.props.imageUrl.image.author;
            let x = ''
            if (this.props.imageUrl.image.location && this.props.imageUrl.image.country) {
                x = `${this.props.imageUrl.image.location}, ${this.props.imageUrl.image.country}`
            } else if (this.props.imageUrl.image.location && !this.props.imageUrl.image.country) {
                x = this.props.imageUrl.image.location
            } else if (!this.props.imageUrl.image.location && this.props.imageUrl.image.country) {
                x = this.props.imageUrl.image.country
            } else {
                x = 'Somewhere'
            }
            return (
                <a className="author__text" target="_blank" rel="noopener noreferrer" href={this.props.imageUrl.image.source}>
                    <Icon type="camera" /> by {author} on Unsplash <br />
                    <FontAwesomeIcon icon={faMapMarker} size="sm" /> {x}
                </a>
            )
        }
        return <a href="https://twitter.com/Mubaris_NK" target="_blank" rel="noopener noreferrer" className="author__text">Made with ♥ by Mubaris NK</a>;
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Image);