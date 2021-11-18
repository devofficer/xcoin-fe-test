// importing modules
import React from 'react';
import { memo } from 'react'
import {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {styled} from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CurrencyBox from './CurrencyBox';
import CurrencyIcon from './CurrencyIcon';
import CurrencyButton from './CurrencyButton';
import CurrencyDialog from './CurrencyDialog';
import CurrencyInputBase from './CurrencyInputBase';
import CurrencyTypography from './CurrencyTypography';

const ErrorTypography = styled(Typography)(({ theme }) => ({
  color: 'red'
}));

export interface WalletProps {
	balance: number,
    type: string,
    currencies: string[],
    currency: string,
    changeCurrency: (type: string, currency: string) => void;
    amount: number,
    changeAmount: (type:string, amount_string: string) => void;
}

const Wallet = (props: WalletProps) => {
    const { balance, type, currency, changeCurrency, currencies, amount, changeAmount } = props;
    const [open, setOpen] = useState(false);

    const handleClose = (selectedCurrency:string) => {
        setOpen(false);
        changeCurrency(type, selectedCurrency);
    };
    
    const handleOpen = () => {
        setOpen(true);
    };

    const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    	changeAmount(type, event.target.value);
    }

    return (
        <CurrencyBox mb={1}>
        	<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" mt={1}>
	        	<CurrencyButton 
	        		variant="contained" 
	        		startIcon={<CurrencyIcon currency={currency} />} 
	        		endIcon={<KeyboardArrowDownIcon />}
	        		onClick={handleOpen}
	        	>
			      {currency}
		      	</CurrencyButton>
				<CurrencyInputBase
					placeholder="0.0"
					inputProps={{ 
						style: {textAlign: 'right'},
						'aria-label': 'Swap Amount' 
					}}
					type="number"
					value={amount}
					onChange={onChangeEvent}
				/>
	      	</Stack>
			<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" mt={1}>
				<CurrencyTypography variant="body2">Balance: {balance} {currency}</CurrencyTypography>
				{balance < amount && type === 'From' ? <ErrorTypography variant="body2">Balance is not enough</ErrorTypography>:''}
				{amount < 0 && (<ErrorTypography variant="body2">Amount can not smaller than 0</ErrorTypography>)}
			</Stack>
			<CurrencyDialog open={open} onClose={handleClose} selectedValue={currency} currencies={currencies}/>
		</CurrencyBox>
    );
}

export default memo(Wallet);