import React from 'react';
import Card from 'react-bootstrap/Card'
import {MovieCard} from './MovieCard';
import { mount } from 'enzyme';
import { ITEM_TYPES } from '../apis';

describe('Testing MovieCard component', () => {
  test('should display title passed by props', () => {
    const tree = mount(<MovieCard
      imageUrl={""}
      title={"mytitle"}
      itemType={ITEM_TYPES.MOVIE}
      id={"test"}
    />);
    const titleComponent = tree.find(Card.Title);
    expect(titleComponent.text()).toEqual('mytitle');
    expect(tree.contains(Card.Title)).toEqual(true);
  });
  test('should be equal to snapshot', () => {
    const tree = mount(<MovieCard
      imageUrl={""}
      title={"mytitle"}
      itemType={ITEM_TYPES.MOVIE}
      id={"test"}
    />);
    expect(tree).toMatchSnapshot();
  });
  test('should call history.push function on click', () => {
    const historyMock = {
      push: jest.fn()
    }
    const tree = mount(<MovieCard
      imageUrl={""}
      title={"mytitle"}
      itemType={ITEM_TYPES.MOVIE}
      id={"test"}
      history={historyMock}
    />);
    tree.simulate('click');
    expect(historyMock.push.mock.calls.length).toEqual(1);
  });
});
