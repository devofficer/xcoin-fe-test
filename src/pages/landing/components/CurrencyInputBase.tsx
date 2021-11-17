import { memo } from 'react'
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const CurrencyInputBase = styled(InputBase)({
	color: 'white',
	backgroundColor: 'rgb(33, 36, 41)',
	fontSize: '24px',
	textOverFlow: 'ellipsis',
	appearance: 'textfield',
	textAlign: 'right'
});

export default memo(CurrencyInputBase);