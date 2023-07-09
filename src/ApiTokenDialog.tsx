import React, { ChangeEvent, Component } from 'react';
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
}

interface State {
  apiToken?: string;
  rememberMe?: boolean;
}

export default class ApiTokenDialog extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      apiToken: props.oldApiToken,
      rememberMe: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ apiToken: event.target.value });
  }

  handleSubmit() {
    const { onClose } = this.props;
    const { apiToken, rememberMe } = this.state;
    onClose({ apiToken, rememberMe });
  }

  handleCancel() {
    const { onClose } = this.props;
    onClose({});
  }

  render() {
    const { open = false, mandatory = false } = this.props;
    const { apiToken, rememberMe } = this.state;

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
            onChange={this.handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox checked={rememberMe} onChange={(e, checked) => this.setState({ rememberMe: checked })} />
            }
            label="Remember me"
          />
        </DialogContent>
        <DialogActions>
          {!mandatory && <Button onClick={this.handleCancel}>Cancel</Button>}
          <Button variant="contained" onClick={this.handleSubmit} disabled={!apiToken}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
