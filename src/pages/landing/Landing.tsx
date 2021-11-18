import * as React from 'react';
import {useState, useEffect} from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
// import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import SettingsIcon from '@mui/icons-material/Settings';
import CurrencyCard from './components/CurrencyCard';
import CurrencyIcon from './components/CurrencyIcon';
import CurrencyTypography from './components/CurrencyTypography';
import CurrencyIconButton from './components/CurrencyIconButton';
import Wallet from './components/Wallet';
import CurrencyType from './consts/CurrencyType';

import Storage from '../../utils/Storage';
import '../../styles/landing.css';

const style = {
  white: {
    color: 'white'
  }
}

const Landing = () => {
  const [fromCurrency, setFromCurrency] = useState(CurrencyType.USD);
  const [toCurrency, setToCurrency] = useState(CurrencyType.GBP);
  const [storage, setStorage] = useState(new Storage());
  const [fromBalance, setFromBalance] = useState(storage.getBalance(fromCurrency));
  const [toBalance, setToBalance] = useState(storage.getBalance(toCurrency));
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(1);
  const [loading, setLoading] = useState(true);
  const currencies:string[] = [
    CurrencyType.USD, 
    CurrencyType.EUR, 
    CurrencyType.GBP
  ];

  const setNewRate = (rate:number) => {
    setLoading(false);
    setRate(rate);
  }

  const changeCurrency = (type: string, currency:string) => {
    setLoading(true);
    if(type === 'From')
    {  
      setFromCurrency(currency);
      setFromBalance(storage.getBalance(currency));
      storage.reloadRateInfo(currency, toCurrency, setNewRate);
    }
    else if(type === 'To')
    {
      setToCurrency(currency);
      setToBalance(storage.getBalance(currency));
      storage.reloadRateInfo(fromCurrency, currency, setNewRate);
    }
  }

  const changeAmount = (type: string, amount_string:string) => {
    if(amount_string.length === 0)
      amount_string = '0';

    if(type === 'From')
    {
      const from_amount = parseFloat(amount_string);
      setAmount(from_amount);
    }
    else
    {
      const to_amount = parseFloat(amount_string);
      setAmount(to_amount / rate);      
    }
  } 

  const swap = () => {
    // if current state is loading rate
    if(loading)
      return;

    const minus_amount = amount;
    const plus_amount = amount * rate;

    // if balance is smaller than minus_amount
    if(fromBalance < minus_amount)
      return;

    // if amount is smaller than 0
    if(minus_amount < 0 || plus_amount < 0)
      return;

    storage.control(fromCurrency, false, minus_amount);
    storage.control(toCurrency, true, plus_amount);
    storage.save();
    setStorage(storage);
    setFromBalance(storage.getBalance(fromCurrency));
    setToBalance(storage.getBalance(toCurrency));
    setAmount(0);
  }

  useEffect(()=>{
    storage.reloadRateInfo(fromCurrency, toCurrency, setNewRate);
  }, []);

  return (
    <CurrencyCard>
      <CardHeader
        // action={
        //   <IconButton aria-label="settings">
        //     <SettingsIcon sx={style.white}/>
        //   </IconButton>
        // }
        title="Currency Swap"
        sx={style.white}
      />
      <CardContent>
        <Wallet 
          type="From" 
          currencies={currencies}
          currency={fromCurrency} 
          balance={fromBalance}
          changeCurrency={changeCurrency}
          amount={amount}
          changeAmount={changeAmount}
        />
        <CurrencyIconButton aria-label="exchange" onClick={swap}>
          <ArrowDownwardIcon/>
        </CurrencyIconButton>
        <Wallet 
          type="To" 
          currencies={currencies} 
          currency={toCurrency}
          balance={toBalance}
          changeCurrency={changeCurrency}
          amount={amount * rate}
          changeAmount={changeAmount}
        />
        <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
            {loading ? <CircularProgress disableShrink  variant="indeterminate" size={16} thickness={10}/> : <div></div>}
            <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
              <CurrencyTypography variant="body2"> 1 </CurrencyTypography>
              <CurrencyIcon currency={fromCurrency} />
              <CurrencyTypography variant="body2"> = </CurrencyTypography> 
              <CurrencyTypography variant="body2"> {rate} </CurrencyTypography> 
              <CurrencyIcon currency={toCurrency} />
            </Stack>
        </Stack>
      </CardContent>
    </CurrencyCard>
  );
}

export default Landing;