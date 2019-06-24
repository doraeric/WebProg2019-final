import React, { Component } from 'react';



export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    

    render() {
        return (
            <div>
                <h3>Searching history</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>content</th>
                            <th>time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(this.props)}
                    </tbody>
                </table>
            </div>
        )
    }
}