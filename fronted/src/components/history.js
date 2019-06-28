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

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = { title: [] };
    // var user_hash=hash(navigator.userAgent)
  }

  componentDidMount() {
    var user_hash = hash(navigator.userAgent);
    var gethis_url =
      "http://linux4.csie.ntu.edu.tw:9487/" + user_hash + "/gethistory";
    const that = this;
    axios.get(gethis_url).then(res =>
      // console.log(res.data)
      that.setState({ title: res.data })
    );
  }

  render() {
    return (
      <div>
        <h3>Searching history</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>
                Title <p style={{ opacity: 0.8 }}>(newest to latest)</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(this.state.title)} */}
            {this.state.title.map((e,index) => {
              return (
                <tr key={index}>
                  <td>{e}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
