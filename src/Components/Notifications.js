import React, { Component } from 'react';

class Notification extends Component {

    render() {
        console.log('notification called...');
        const styleArr = ['container'];
        if (this.props.visible) {
            styleArr.push('visible');
        }
        else {
            styleArr.push('hidden');
        }

        return (
            <div className={styleArr.join(' ')}>{this.props.children}</div>
        );
    }
}

export default Notification;