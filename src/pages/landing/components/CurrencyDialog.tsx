import { memo } from 'react'
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import CurrencyIcon from './CurrencyIcon';

export interface CurrencyDialogProps {
  currencies: string[];
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const StyledDialog = styled(Dialog) (({ theme }) => ({
    '& .MuiDialog-paper': {
      backgroundColor: 'rgb(25, 27, 31)',
      border: '1px solid rgb(33, 36, 41)',
      boxShadow: 'rgb(0 0 0 / 5%) 0px 4px 8px 0px',
      color: 'white',
      minWidth: '300px',
      borderRadius: '20px'
    },
    '& .MuiDialogTitle-root': {
      fontSize: '16px',
      borderBottom: ''
    },
    '& .MuiDialogContent-dividers': {
      borderTop: '1px solid rgb(44, 47, 54)'
    }
}));

const CurrencyDialog = (props: CurrencyDialogProps) => {
  const { onClose, selectedValue, open, currencies} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <StyledDialog onClose={handleClose} open={open}>
      <DialogTitle>Select a Currency</DialogTitle>
      <DialogContent dividers>
        <List sx={{ pt: 0 }}>
          {currencies.map((currency) => (
            <ListItem button onClick={() => handleListItemClick(currency)} key={currency}>
              <ListItemIcon>
                <CurrencyIcon currency={currency} />
              </ListItemIcon>
              <ListItemText primary={currency} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </StyledDialog>
  );
}

export default memo(CurrencyDialog);