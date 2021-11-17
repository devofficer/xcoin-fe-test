import { memo } from 'react'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const CurrencyIconButton = styled(IconButton)({
	color: 'white',
	backgroundColor: 'rgb(33, 36, 41)',
	padding: '4px',
	border: '4px solid rgb(25, 27, 31)',
	borderRadius: '12px',
	position: 'fixed',
	left: 'calc(50% - 16px)',
	zIndex: 2,
	width: '32px',
	height: '32px',
	marginTop: '-20px',
	marginBottom: '-20px',
	'&:hover': {
	    backgroundColor: 'rgba(33, 36, 41, 0.8)',
	    border: '4px solid rgba(25, 27, 31, 0.8)'
  	},
});

export default memo(CurrencyIconButton);