import React from 'react';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';

interface Props {
  size?: 'small' | 'medium' | 'large';
  visible?: boolean;
}

const spacingBySize = { small: 1, medium: 1.5, large: 2 };

export default function RunningEntryIndicator({ size = 'medium', visible = true }: Props) {
  return visible ? (
    <Box
      sx={{
        display: 'inline-block',
        padding: spacingBySize[size] || 0,
      }}
      component="span"
    >
      <Tooltip title="You have a running time entry" placement="top">
        <Icon
          fontSize={size}
          sx={{
            color: red[500],
            verticalAlign: 'top',
            animation: 'blinker 2s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite',
          }}
        >
          fiber_manual_record
        </Icon>
      </Tooltip>
    </Box>
  ) : null;
}
