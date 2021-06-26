import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

class ApiTokenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiToken: props.oldApiToken,
      rememberMe: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
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
    const { open, mandatory } = this.props;
    const { apiToken, rememberMe } = this.state;

    return (
      <Dialog
        open={open}
        disableBackdropClick={mandatory}
        disableEscapeKeyDown={mandatory}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter your Toggl API Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your Toggl time entries will be fetched using your API Token, which you can find from your{' '}
            <a href="https://www.toggl.com/app/profile" target="_blank" rel="noopener noreferrer">
              Toggl profile <Icon fontSize="small">open_in_new</Icon>
            </a>
          </DialogContentText>
          <TextField
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
              <Checkbox
                color="primary"
                checked={rememberMe}
                onChange={(e, checked) => this.setState({ rememberMe: checked })}
              />
            }
            label="Remember me"
          />
        </DialogContent>
        <DialogActions>
          {!mandatory && (
            <Button color="primary" onClick={this.handleCancel}>
              Cancel
            </Button>
          )}
          <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={!apiToken}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ApiTokenDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  oldApiToken: PropTypes.string,
  open: PropTypes.bool,
  mandatory: PropTypes.bool,
};

ApiTokenDialog.defaultProps = {
  oldApiToken: '',
  open: true,
  mandatory: false,
};

export default withStyles({}, { withTheme: true })(ApiTokenDialog);
