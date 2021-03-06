import React from 'react';
import { connect } from 'react-redux';
// import * as actions from './store/actions/auth.js';

import './rotator.css';
import List from '../../lib/linked-list.js';
import uuid from 'uuid';

export class Rotator extends React.Component {
  constructor(props) {
    super(props);
    // Build a linked list out of the children of this component
 
    let list = List.fromArray(this.props.children);

    // this.state.current will always be the node in the link list that
    // is active based on next/previous/select methods.  Simply changing
    // that bit of state will render that node in the rotator.
    let current = list.root;
    this.state = { list, current };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.select = this.select.bind(this);
  }

  /*
    Get the next node in the linked list
    If we're at the end, go back to the beginning (root)
  */
  next() {
    let current = this.state.current.next
      ? this.state.current.next
      : this.state.list.root;

    this.setState({ current });
  }

  /*
    Get the previous node in the linked list
    If we're at the beginning, go back to the end via findLast()
  */
  previous() {
    let current = this.state.current.prev
      ? this.state.current.prev
      : this.state.list.findLast();

    this.setState({ current });
  }

  /*
    Select a specific node in the linked list
  */
  select(e) {
    let idx = parseInt(e.target.dataset.idx, 10);
    let current = this.state.list.findNth(idx);
    this.setState({ current });
  }

  render() {
    let pips = [];
    let i = 0;
    let current = this.state.list.root;
    while (current) {
      pips.push(<li key={uuid()} data-idx={i++} onClick={this.select} />);
      current = current.next;
    }
    let currentValue = this.state.current && this.state.current.value;
   
    return (
      
      <div className="rotator deck">
        <nav>
          <ul>{pips}</ul>
        </nav>
        <div className="card">
          <button onClick={this.previous}>P</button>
          {currentValue}
          <button onClick={this.next}>N</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // auth: state.auth,
});

const mapDispatchToprops = (dispatch, getState) => ({
  // switch: payload => dispatch(actions.switchUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToprops)(Rotator);
