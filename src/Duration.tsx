import moment from 'moment';
import React from 'react';
import Typography from '@mui/material/Typography';

interface Props {
  duration: number;
  useColors: boolean;
}

export default function Duration({ duration, useColors = false }: Props) {
  let sign = '';
  if (duration > 0) {
    sign = '+';
  } else if (duration < 0) {
    sign = '-';
  }
  const durationObj = moment.duration(Math.abs(duration), 'seconds');
  const durationFormatted = `${Math.floor(durationObj.asHours())}:${durationObj.minutes().toString().padStart(2, '0')}`;
  let color;
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
