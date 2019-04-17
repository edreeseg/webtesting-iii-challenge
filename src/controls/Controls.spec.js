import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Controls from './Controls';
afterEach(cleanup);

describe('<Controls />', () => {
  it('Should render without crashing', () => {
    render(<Controls />);
  });
  it('Should match snapshot', () => {
    const tree = renderer.create(<Controls />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('Should provide button to close gate', () => {
    const { getByText } = render(<Controls />);
    getByText(/Close Gate/i);
  });
  it('Should provide button to lock gate', () => {
    const { getByText } = render(<Controls />);
    getByText(/^Lock Gate/i);
  });
  it('Should disable lock button if gate is open', () => {
    const { queryByText } = render(<Controls />);
    const button = queryByText(/^Lock Gate/i);
    expect(button).toBeDisabled();
  });
  it('Should disable open button if gate is locked', () => {
    const { queryByText } = render(<Controls locked closed />);
    const openButton = queryByText(/Open Gate/i);
    expect(openButton).toBeDisabled();
  });
  it('Should fire toggleClosed function when close button is clicked', () => {
    const mock = jest.fn();
    const { queryByText } = render(<Controls toggleClosed={mock} />);
    const closeButton = queryByText(/Close Gate/i);
    fireEvent.click(closeButton);
    expect(mock).toHaveBeenCalled();
  });
  it('Should not fire toggleClosed function when close button is clicked while gate is locked', () => {
    const mock = jest.fn();
    const { queryByText } = render(
      <Controls toggleClosed={mock} closed locked />
    );
    const openButton = queryByText(/Open Gate/i);
    fireEvent.click(openButton);
    expect(mock).not.toHaveBeenCalled();
  });
  it('Should fire toggleLocked function when lock button is clicked', () => {
    const mock = jest.fn();
    const { queryByText } = render(<Controls toggleLocked={mock} closed />);
    const lockButton = queryByText(/^Lock Gate/i);
    fireEvent.click(lockButton);
    expect(mock).toHaveBeenCalled();
  });
  it('Should not fire toggleLocked function when lock button is clicked while gate is open', () => {
    const mock = jest.fn();
    const { queryByText } = render(<Controls toggleLocked={mock} />);
    const lockButton = queryByText(/^Lock Gate/i);
    fireEvent.click(lockButton);
    expect(mock).not.toHaveBeenCalled();
  });
});
