import React, { Component } from 'react';
import DisplayLog from './DiaplayLog';
import formateTime from '../utils/formateTime'

class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            on: false,
            log: []
        }

    }

    handleClick = () => {
        if (this.state.on) {
            clearInterval(this.timer);
        } else {
            this.timer = setInterval(() => {
                this.setState({ time: ++this.state.time })
            }, 10)
        }
        this.setState({ on: !this.state.on })
    }

    handlelogTime = () => {
        this.state.log.push(this.state.time);
        // console.log(this.state.time);
    }

    handlelClear = () => {
        this.setState({ log: [] })

    }

    handleReset = () => {
        this.setState({ time: 0 });
    }

    render() {
        var text = this.state.on ? 'stop' : 'start';
        var time = formateTime(this.state.time);
        return <div>
            <h1 className="time_displayer">{time}</h1>
            <div className="controler">
                <button width="10px" height="100px" className={this.state.on ? "danger" : "success"} text={text} onClick={this.handleClick} />
                <button width="10px" height="100px" className="warning" text="reset" onClick={this.handleReset} />
                <button className="primary" text="record" onClick={this.handlelogTime} />
                <button className="undefined" text="empty" onClick={this.handlelClear} />
            </div>

            <DisplayLog log={this.state.log} />

        </div>
    }

    componentDidMount() {
        window.addEventListener('keydowm', e => e.preventDefault())
        window.addEventListener('keyup', e => {
            e.preventDefault();
            switch (e.keyCode) {
                case 32://space
                    this.handleClick();
                    break
                case 82://重置
                    this.handleReset();
                    break
                case 13:
                    this.handlelogTime();
                    break
                case 67:
                    this.handlelClear()
                    break
            }
        })
    }
}

export default Clock;
