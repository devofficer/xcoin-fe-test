import { memo } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CurrencyButton = styled(Button)({
	fontSize: '18px',
	color: 'white',
	padding: '0px 8px',
	backgroundColor: 'rgb(25, 27, 31)',
	borderRadius: '16px',
	boxShadow: 'rgb(0 0 0 / 8%) 0px 6px 10px',
});

export default memo(CurrencyButton);