import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    color: red[500],
    marginLeft: theme.spacing(2),
    verticalAlign: 'top',
    animation: 'blinker 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite'
  }
});

const RunningEntryIndicator = props => {
  const { size, visible, classes } = props;
  return visible ? (
    <Tooltip title="You have a running time entry" placement="top">
      <Icon fontSize={size} className={classes.root}>
        fiber_manual_record
      </Icon>
    </Tooltip>
  ) : null;
};

RunningEntryIndicator.propTypes = {
  size: PropTypes.oneOf(['default', 'small', 'large']),
  visible: PropTypes.bool
};

RunningEntryIndicator.defaultProps = {
  size: 'default',
  visible: true
};

export default withStyles(styles, { withTheme: true })(RunningEntryIndicator);
