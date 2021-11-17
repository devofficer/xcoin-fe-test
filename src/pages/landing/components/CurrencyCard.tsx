import { memo } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

const CurrencyCard = styled(Card)({
	maxWidth: '480px',
    borderRadius: '24px',
    marginTop: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: 'rgb(25, 27, 31)',
    boxShadow: 'rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px'
});

export default memo(CurrencyCard);