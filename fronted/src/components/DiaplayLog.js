import React, { Component } from 'react';
import formateTime from '../utils/formateTime'


export default  class DisplayLog extends Component {

    renderEmpty = ()=>{
        return <span className="empty_log"></span>;
    }

    renderLog = ()=>{
        return this.props.log.map((item,i) => {
            return <li className="log_item">{formateTime(item)}</li>
        });
    }

    render() {

        const log = this.props.log.length === 0 ? this.renderEmpty() : this.renderLog();

        return <ul className="log">
            {log}
        </ul>
    }
}

