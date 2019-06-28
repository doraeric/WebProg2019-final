import React, { Component } from "react";
import axios from "axios";

function hash(s) {
  var hash = 0,
    i,
    chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      submit: false,
      user_query: "",
      todo_completed: false
    };
  }

  onChangeTodoDescription = e => {
    this.setState({
      user_query: e.target.value
    });
  };

  onSubmit = e => {
    //e.preventDefault();
    e.preventDefault();


    const test = {
      news: [{ url: "", title: "", content: "" }]
    };
    const that = this;
    var user_hash = hash(navigator.userAgent);
    axios
      .get(
        "http://linux4.csie.ntu.edu.tw:9487/" +
          user_hash +
          "/search?keyword=" +
          this.state.user_query,
        test
      )
      .then(res => that.setState({ news: res.data.news }));

    this.setState({
      user_query: "",
      todo_completed: false,
      submit: true
    });
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 className="mb-5">keyword</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group RNNXgb form-control mb-5">
            <label />
            <input
              type="text"
              className="input"
              value={this.state.user_query}
              onChange={this.onChangeTodoDescription}
            />
            <div onClick={this.onSubmit}>
              <i
                style={{ height: "100%" }}
                className=" ml-2 fa fa-search search_icon"
              />
            </div>
          </div>

          <div className="container">
            {this.state.news.map((e, index) => {
              return (
                <div key={index}>
                  <a href={e.url} style={{ fontSize: 24 }}>
                    {e.title}
                  </a>
                  <div>{e.url}</div>
                  <div>{e.content.substring(0, 130) + "..."}</div>
                  <br />
                </div>
              );
            })}
          </div>
        </form>
      </div>
    );
  }
}
