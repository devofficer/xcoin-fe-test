import { memo } from 'react'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const CurrencyTypography = styled(Typography)({
	color: 'rgb(195, 197, 203)',	
	fontSize: '14px',
	cursor: 'pointer'
});

export default memo(CurrencyTypography);