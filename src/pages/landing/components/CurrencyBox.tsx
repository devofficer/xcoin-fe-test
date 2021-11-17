import { memo } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const CurrencyBox = styled(Box)({
	width: '100%',
    padding: '15px',
    border: '1px solid rgb(44, 47, 54)',
    borderRadius: '20px',
    background: 'rgb(33, 36, 41)',
    '&:hover': {
        border: '1px solid rgb(64, 67, 74)',
    },
});

export default memo(CurrencyBox);