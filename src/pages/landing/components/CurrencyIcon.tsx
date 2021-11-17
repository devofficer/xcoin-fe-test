import * as React from 'react';
import { memo } from 'react'
import SvgIcon from '@mui/material/SvgIcon';

import CurrencyType from '../consts/CurrencyType';
import { ReactComponent as DollarIcon } from '../icons/dollar.svg';
import { ReactComponent as EuroIcon } from '../icons/euro.svg';
import { ReactComponent as PoundIcon} from '../icons/pound.svg';

interface CurrecyIconProps {
	currency: string
}

const CurrencyIcon = (props: CurrecyIconProps) => {
	const { currency } = props;

	if (currency === CurrencyType.USD)
		return <SvgIcon component={DollarIcon} viewBox="0 0 600 475" />;
	if (currency === CurrencyType.EUR)
		return <SvgIcon component={EuroIcon} viewBox="0 0 600 475" />;
	return <SvgIcon component={PoundIcon} viewBox="0 0 600 475" />;
}

export default memo(CurrencyIcon);