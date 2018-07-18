import React from 'react';
import renderer from 'react-test-renderer';

import App from '../../src/App.js';

describe('<App/> (Enzyme Test)', () => {
  it('is alive at application start', () => {
    let app = shallow(<App/>);
    expect(app.find('main').exists()).toBeTruthy();
  })
});

describe('<App/> (Snapshot Test)', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <App />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
}

