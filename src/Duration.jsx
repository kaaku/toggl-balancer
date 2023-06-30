import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';

export default function Duration(props) {
  const { duration, useColors } = props;

  let sign = '';
  if (duration > 0) {
    sign = '+';
  } else if (duration < 0) {
    sign = '-';
  }
  const durationObj = moment.duration(Math.abs(duration), 'seconds');
  const durationFormatted = `${Math.floor(durationObj.asHours())}:${durationObj.minutes().toString().padStart(2, '0')}`;
  let color = null;
  if (useColors && duration !== 0) {
    color = duration < 0 ? 'error' : 'primary';
  }

  return (
    <Typography color={color} variant="inherit" sx={{ display: 'inline-block' }}>
      {sign}
      {durationFormatted}
    </Typography>
  );
}

Duration.propTypes = {
  duration: PropTypes.number.isRequired,
  useColors: PropTypes.bool,
};

Duration.defaultProps = {
  useColors: false,
};
