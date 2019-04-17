import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Display from './Display';
afterEach(cleanup);

describe('<Display />', () => {
  it('Should render without crashing', () => {
    render(<Display />);
  });
  it('Should match snapshot', () => {
    const tree = renderer.create(<Display />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('Should display gate as open by default', () => {
    const { getByText } = render(<Display />);
    getByText(/Open/i);
  });
  it('Should display gate as unlocked by default', () => {
    const { getByText } = render(<Display />);
    getByText(/Unlocked/i);
  });
  it('Should display gate as closed if closed prop is passed', () => {
    const { getByText } = render(<Display closed />);
    getByText(/Closed/i);
  });
  it('Should display gate as locked if locked prop is passed', () => {
    const { getByText } = render(<Display locked />);
    getByText(/^Locked/i);
  });
  it('Should use red-led class when locked', () => {
    const { queryByText } = render(<Display locked />);
    const status = queryByText(/^Locked/i);
    expect(status).toHaveClass('red-led');
  });
  it('Should use red-led class when closed', () => {
    const { queryByText } = render(<Display closed />);
    const status = queryByText(/Closed/i);
    expect(status).toHaveClass('red-led');
  });
  it('Should use green-led class when unlocked', () => {
    const { queryByText } = render(<Display />);
    const status = queryByText(/Unlocked/i);
    expect(status).toHaveClass('green-led');
  });
  it('Should use green-led class when open', () => {
    const { queryByText } = render(<Display />);
    const status = queryByText(/Open/i);
    expect(status).toHaveClass('green-led');
  });
});
