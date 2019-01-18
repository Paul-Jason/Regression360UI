import React, { Component } from 'react';

export default class Commit extends Component {
  render() {
    return (
            <ul className="commits">
                {data[key].map(commit => <li>
                                            <span>{commit.commitId}</span>  
                                            </li>)}
            </ul>
    );
  }
}