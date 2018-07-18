import './readme.css';

import React from 'react';
import superagent from 'superagent';
import ReactMarkdown from 'react-markdown';
import Notes from '../notes/notes.js';
import * as api from '../../lib/api.js';

export default class Readme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {content: ''}
        this.submitNotes = this.submitNotes.bind(this);
    }

    // need to set up route on backend to handle note submissions
    async submitNotes(input){
        let payload = {
            endpoint:'notes',
            body:input
        }
        let solution = await api.post(payload);
        console.log('api routing', {solution});
      }
    //Changed from componentWillUpdate after spinner was setup
    async componentWillMount(prevProps, prevState) {
        let url = this.props.readmeDoc;
        if (url && url.length) {
            let data = await superagent.get(url);
            let content = atob(data.body.content);
            this.setState({ content });
        }
    }

    render() {
        return (
            <div className="readme">
              <Notes submitNotes={this.submitNotes}/>
              <ReactMarkdown source={this.state.content} />
            </div>
        )
    }
};
