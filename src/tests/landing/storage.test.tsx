// importing modules
import React from 'react';
import { render, screen } from '@testing-library/react';

// importing components
import Storage from '../../utils/Storage';
import CurrencyType from '../../pages/landing/consts/CurrencyType';
test('storage number is set for base values', () => {
  const storage = new Storage();
  const expected = 200;
  expect(storage.balance[CurrencyType.USD]).toEqual(expected);
});

test('USD balace is correct', () => {
  const storage = new Storage();
  const expected = 200;
  const dollar = storage.getBalance(CurrencyType.USD);
  expect(dollar).toEqual(expected);
});

test('money control success', () => {
  let storage = new Storage();
  const minus_amount = 30;
  const plus_amount = 10;
  const dollor_minus_expected = 170;
  const dollor_plus_expected = 180;

  // first, reduce amount from storage
  storage.control(CurrencyType.USD, false, minus_amount);
  let balance = storage.getBalance(CurrencyType.USD);
  expect(balance).toEqual(dollor_minus_expected);

  // second, increase amount from storage
  storage.control(CurrencyType.USD, true, plus_amount);
  balance = storage.getBalance(CurrencyType.USD);
  expect(balance).toEqual(dollor_plus_expected);
});