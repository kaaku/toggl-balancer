import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';

interface Props {
  open: boolean;
  mandatory: boolean;
  oldApiToken?: string;
  onClose: (result: { apiToken?: string; rememberMe?: boolean }) => void;
  onDismiss?: () => void;
}

export default function ApiTokenDialog({
  open,
  mandatory,
  oldApiToken,
  onClose = () => {},
  onDismiss = () => {},
}: Props) {
  const [apiToken, setApiToken] = useState(oldApiToken);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <Dialog open={open} disableEscapeKeyDown={mandatory} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter your Toggl API Token</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your Toggl time entries will be fetched using your API Token, which you can find from your{' '}
          <a href="https://track.toggl.com/profile" target="_blank" rel="noopener noreferrer">
            Toggl profile <Icon fontSize="small">open_in_new</Icon>
          </a>
        </DialogContentText>
        <TextField
          variant="standard"
          type="password"
          autoFocus
          fullWidth
          margin="dense"
          label="API Token"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e, checked) => setRememberMe(checked)} />}
          label="Remember me"
        />
      </DialogContent>
      <DialogActions>
        {!mandatory && <Button onClick={() => onDismiss()}>Cancel</Button>}
        <Button variant="contained" onClick={() => onClose({ apiToken, rememberMe })} disabled={!apiToken}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
