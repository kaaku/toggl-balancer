import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';

function Duration(props) {
  const { duration, useColors, textProps } = props;

  // eslint-disable-next-line no-nested-ternary
  const sign = duration === 0 ? '' : duration > 0 ? '+' : '-';
  const durationObj = moment.duration(Math.abs(duration), 'seconds');
  const durationFormatted = `${Math.floor(durationObj.asHours())}:${durationObj.minutes().toString().padStart(2, '0')}`;
  if (useColors) {
    textProps.color = duration < 0 ? 'error' : 'primary';
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography {...textProps}>
      {sign}
      {durationFormatted}
    </Typography>
  );
}

Duration.propTypes = {
  duration: PropTypes.number.isRequired,
  useColors: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  textProps: PropTypes.object,
};

Duration.defaultProps = {
  useColors: false,
  textProps: {},
};

export default withStyles({}, { withTheme: true })(Duration);
