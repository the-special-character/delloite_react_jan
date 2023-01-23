import React from 'react';
import Product from './Product';
import { render, screen, fireEvent } from '@testing-library/react';

const products = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 3.9,
    count: 120,
  },
};

const addToCart = jest.fn();
const updateCartItem = jest.fn();
const deleteCartItem = jest.fn();

describe('Product Component', () => {
  beforeEach(() => {
    render(
      <Product
        product={products}
        addToCart={addToCart}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
        isAdding={false}
        isUpdating={false}
        isDeleting={false}
      />,
    );
  });

  it('product component render succ', () => {
    const wrapper = screen.queryByTestId('product-wrapper');
    expect(wrapper).toBeInTheDocument();
  });

  it('only add button should be in the document', () => {
    const btns = screen.queryAllByRole('button');
    expect(btns.length).toBe(1);
    expect(btns[0].innerHTML).toMatch('Add to bag');
  });

  it('should click button', () => {
    const btns = screen.queryAllByRole('button');
    fireEvent.click(btns[0]);
    expect(addToCart).toBeCalledTimes(1);
    expect(addToCart).toBeCalledWith({
      productId: 1,
      quantity: 1,
    });
  });
});
