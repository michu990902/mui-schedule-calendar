import React from 'react'
import {
    Paper,
    Box,
    IconButton,
    Typography,
    Grid
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { red, green } from '@material-ui/core/colors';

const Task = ({ color, label, startAt, endAt, duration, isDone, action }) => (
    <Box p={1}>
        <Paper>
            <Box p={1}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item>
                        <IconButton>
                            {isDone ? <DoneIcon style={{ color: green[700] }}/> : <CloseIcon style={{ color: red[700] }}/>}
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">{label}</Typography>
                        <Typography variant="body2">8:00 - 9:00 (1h)</Typography>
                    </Grid>
                    {action && (
                        <Grid item style={{marginLeft: "auto"}}>
                            <IconButton>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Paper>
    </Box>
);

export default Task;