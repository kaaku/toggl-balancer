import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

const Duration = (props) => {
    const {duration, useColors, textProps} = props;

    const sign = duration === 0 ? '' : (duration > 0 ? '+' : '-');
    const durationObj = moment.duration(Math.abs(duration), 'seconds');
    const durationFormatted = Math.floor(durationObj.asHours()) + ':' +
        durationObj.minutes().toString().padStart(2, '0');
    if (useColors) {
        textProps.color = duration < 0 ? 'error' : 'primary';
    }

    return (
        <Typography {...textProps}>
            {sign}{durationFormatted}
        </Typography>
    );
};

Duration.propTypes = {
    duration: PropTypes.number.isRequired,
    useColors: PropTypes.bool,
    textProps: PropTypes.object
};

Duration.defaultProps = {
    useColors: false,
    textProps: {}
};

export default withStyles({}, {withTheme: true})(Duration);