import React from 'react';
import './notes.css';


import superagent from 'superagent';

export default class Notes extends React.Component {
    constructor(props){
        super(props)
        this.state = {notes:''}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.props);

        console.log('submit', this.state.notes);
      //  this.props.submitNotes(this.state.notes);
    }

    onChange(e) {
        let newNote = e.target.value;
        console.log(newNote);
        this.setState({notes:newNote});
    }

    render() {
      return (
        <div className="notes">
          <form onChange={this.onChange}>
            <label>
            Add Note:
            <input type="text" name="note" />
            </label>
            <input type="submit" id="submitNotes" onClick={this.handleSubmit} placeholder="TESTING"/>
          </form>
        </div>)
    }
}
