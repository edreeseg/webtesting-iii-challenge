import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Dashboard from './Dashboard';
afterEach(cleanup);

describe('<Dashboard />', () => {
  it('Should render without crashing', () => {
    render(<Dashboard />);
  });
  it('Should match snapshot', () => {
    const tree = renderer.create(<Dashboard />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('Should show controls', () => {
    const { getByText } = render(<Dashboard />);
    getByText(/Lock Gate/i);
  });
  it('Should show display', () => {
    const { getByText } = render(<Dashboard />);
    getByText(/Unlocked/i);
  });
  it('Should have button names that reflect status of gate', () => {
    // Wanted to put in Controls tests, but did not have access to state of Dashboard from there.
    const { getByText, queryByText } = render(<Dashboard />);
    const closeButton = getByText(/Close Gate/i);
    const lockButton = getByText(/^Lock Gate/i);
    expect(queryByText(/Open Gate/i)).toBeFalsy();
    expect(queryByText(/Unlock Gate/i)).toBeFalsy();
    fireEvent.click(closeButton);
    getByText(/Open Gate/i);
    expect(queryByText(/Close Gate/i)).toBeFalsy();
    fireEvent.click(lockButton);
    getByText(/Unlock Gate/i);
    expect(queryByText(/^Lock Gate/i)).toBeFalsy();
  });
});
