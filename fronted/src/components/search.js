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

function Result_prop(props) {
  if (props[0] === true) {
    return (
      <div className="result_prop mb-5">
        {props[1]} 項搜尋結果(搜尋時間約{props[2]}秒)
      </div>
    );
  } else if (props[0] == null) {
    return;
  } else {
    return (
      <p className="result_prop mb-5">
        找不到符合搜尋字詞「{props[3]}」的新聞。
      </p>
    );
  }
}

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      submit: false,
      user_query: "",
      last_query: "",
      result_prop: null,
      query_time: 0
    };
  }

  onChangeTodoDescription = e => {
    this.setState({
      user_query: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const t0 = performance.now();
    var last_query = this.state.user_query;

    const that = this;
    var user_hash = hash(navigator.userAgent);

    axios
      .get(
        "http://linux4.csie.ntu.edu.tw:9487/" +
          user_hash +
          "/search?keyword=" +
          this.state.user_query
      )
      .then(res => that.setState({ news: res.data.news }))
      .then(() => {
        const t1 = performance.now();
        var result_prop;
        if (this.state.news.length !== 0) {
          result_prop = true;
        } else {
          result_prop = false;
        }
        this.setState({
          user_query: "",
          last_query: last_query,
          submit: true,
          query_time: ((t1 - t0) / 1000).toFixed(2),
          result_prop: result_prop
        });
      });
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 className="mb-5">keyword</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group RNNXgb form-control">
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
          {Result_prop([
            this.state.result_prop,
            this.state.news.length,
            this.state.query_time,
            this.state.last_query
          ])}
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
