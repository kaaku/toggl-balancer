import PropTypes from 'prop-types';
import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

class ApiTokenDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {apiToken: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {
        this.setState({apiToken: event.target.value});
    }

    handleClose() {
        this.props.onClose(this.state.apiToken);
    }

    render() {
        return (
            <Dialog open={this.props.open}
                    disableBackdropClick={this.props.mandatory}
                    disableEscapeKeyDown={this.props.mandatory}
                    aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Enter your Toggl API Token</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your Toggl time entries will be fetched using your API Token, which you can find from your{' '}
                        <a href='https://www.toggl.com/app/profile' target='_blank' rel='noopener noreferrer'>
                            Toggl profile <Icon fontSize='small'>open_in_new</Icon>
                        </a>.
                    </DialogContentText>
                    <TextField autoFocus fullWidth margin='dense' label='API Token' onChange={this.handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button color='primary'
                            onClick={this.handleClose}
                            disabled={!this.props.mandatory || !this.state.apiToken}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ApiTokenDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    mandatory: PropTypes.bool
};

ApiTokenDialog.defaultProps = {
    mandatory: false
};

export default ApiTokenDialog;
