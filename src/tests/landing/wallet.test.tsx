// importing modules
import React from 'react';
import { render, screen } from '@testing-library/react';

// importing components
import Wallet from '../../pages/landing/components/Wallet';
import CurrencyType from '../../pages/landing/consts/CurrencyType';

const currencies:string[] = [
  CurrencyType.USD, 
  CurrencyType.EUR, 
  CurrencyType.GBP
];

const changeCurrency = jest.fn();
const changeAmount = jest.fn();
const amount = -100;

test('shows balance is not enough error when input amount bigger than balance', () => {
  render(
    <Wallet 
      type="From" 
      currencies={currencies}
      currency={'USD'} 
      balance={'EUR'}
      changeCurrency={changeCurrency}
      amount={amount}
      changeAmount={changeAmount}
    />
  );
  const error = screen.getByText('Amount can not smaller than 0');
  expect(error).toBeInTheDocument();
});


test('shows balance is not enough error when amount is bigger than balance', () => {
  render(
    <Wallet 
      type="From" 
      currencies={currencies}
      currency={'USD'} 
      balance={'EUR'}
      changeCurrency={changeCurrency}
      amount={200}
      changeAmount={changeAmount}
      balance={100}
    />
  );
  const error = screen.getByText('Balance is not enough');
  expect(error).toBeInTheDocument();
});

