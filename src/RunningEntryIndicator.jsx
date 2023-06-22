import PropTypes from 'prop-types';
import React from 'react';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';
import withStyles from '@mui/styles/withStyles';

const spacingBySize = { small: 1, default: 1.5, large: 2 };
const styles = (theme) => ({
  root: {
    display: 'inline-block',
    padding: (props) => theme.spacing(spacingBySize[props.size] || 0),
  },
  icon: {
    color: red[500],
    verticalAlign: 'top',
    animation: 'blinker 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite',
  },
});

function RunningEntryIndicator(props) {
  const { size, visible, classes } = props;
  return visible ? (
    <Box className={classes.root} component="span">
      <Tooltip title="You have a running time entry" placement="top">
        <Icon fontSize={size} className={classes.icon}>
          fiber_manual_record
        </Icon>
      </Tooltip>
    </Box>
  ) : null;
}

RunningEntryIndicator.propTypes = {
  size: PropTypes.oneOf(['default', 'small', 'large']),
  visible: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

RunningEntryIndicator.defaultProps = {
  size: 'default',
  visible: true,
};

export default withStyles(styles, { withTheme: true })(RunningEntryIndicator);
