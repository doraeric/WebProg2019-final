import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            submit: false,
            user_query: '',
            todo_completed: false
        }
    }
    onChangeTodoDescription = (e) => {
        this.setState({
            user_query: e.target.value
        });
    }

    onSubmit = (e) => {
        //e.preventDefault();

        e.preventDefault();

        console.log(`Todo Description: ${this.state.user_query}`);

        
        const test = {
            news: [{ url: "", title: "", content: "" }]
        }
        //axios.post('http://localhost:4000/todos/add', newTodo)
        //    .then(res => console.log(res.data));
        const that=this;
        axios.get('http://linux4.csie.ntu.edu.tw:9487/user/search?keyword='+this.state.user_query, test)
            .then(res =>
            that.setState({news:res.data.news})
            );

        console.log("logger")
        this.setState({
            user_query: '',
            todo_completed: false,
            submit: true
        })
    }

    render() {
            return (
                <div style={{ marginTop: 10 }}>
                    <h3>keyword</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label></label>
                            <input type="text"
                                className="form-control"
                                value={this.state.user_query}
                                onChange={this.onChangeTodoDescription}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Searching" className="btn btn-primary" />
                        </div>
                        <div className="container">
                        {this.state.news.map((e,index)=>{
                            return <div key={index}><a href={e.url} style={{fontSize:24}}>{e.title}</a><div>{e.url}</div><div>{e.content.substring(0,130)+"..."}</div><br/> </div>
                        })}
                        </div>
                    </form>
                </div>
            )


    }
}

