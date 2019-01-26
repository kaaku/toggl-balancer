import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

const Duration = (props) => {
    const {time, useColors} = props;

    const sign = time === 0 ? '' : (time > 0 ? '+' : '-');
    const duration = moment.duration(time, 'seconds');
    const durationFormatted = Math.abs(Math.floor(duration.asHours())) + ':' +
        Math.abs(duration.minutes()).toString().padStart(2, '0');
    const textProps = {
        variant: 'inherit'
    };
    if (useColors) {
        textProps.color = time < 0 ? 'error' : 'primary';
    }

    return (
        <Typography {...textProps}>
            {sign}{durationFormatted}
        </Typography>
    );
};

Duration.propTypes = {
    time: PropTypes.number.isRequired,
    useColors: PropTypes.bool
};

Duration.defaultProps = {
    useColors: false
};

export default withStyles({}, {withTheme: true})(Duration);