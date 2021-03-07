import React, { useReducer, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Toolbar,
    IconButton,
    Typography,
    TextField,
    Radio,
    Grid
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { teal, lightBlue, cyan, lightGreen, red, brown, grey, purple, pink, orange } from '@material-ui/core/colors'
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { timeDiff } from '../../lib/calendar'

const useStyles = makeStyles(theme => ({
    root: {
        flexDirection: '100%',
    },
    title: {
        flexGrow: 1, 
    },
    closeBtn: {
        marginRight: -theme.spacing(1.5), 
    },
    select: {
        marginBottom: theme.spacing(2), 
    },
    text: {
        color: theme.palette.divider, 
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: theme.spacing(2),
    },
}));

const radioGenerator = (color, selectedValue, handleChange) => withStyles({
    root: {
        color,
        '&$checked': {
            color,
        },
    },
    checked: {},
})((props) => <Radio 
    color="default"
    name="color"
    value={color}
    checked={selectedValue === color}
    onChange={handleChange}
    {...props}
/>)


const AddTaskDialog = ({ isOpen, addTask, handleClose, selectedDate }) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer((state, action) => ({...state, ...action}), {
        id: ~~(Math.random() * 1000000), // TODO
        startAt: new Date(),
        endAt: new Date(),
        duration: {
            hours: 0,
            minutes: 0,
        },
        title: "",
        url: "",
        // location: "",
        // description: "",
        // reminderNotification: false,
        color: lightBlue[800],
    });

    useEffect(() => {
        const tmp = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            selectedDate.getHours() + 1 < 24 ? selectedDate.getHours() + 1 : selectedDate.getHours(),
            selectedDate.getHours() + 1 < 24 ? selectedDate.getMinutes() : 59,
        );

        dispatch({
            startAt: selectedDate,
            endAt: tmp,
            duration: timeDiff(selectedDate, tmp),
        });
    }, []);

    const handleChange = ev => {
        dispatch({
            [ev.target.name]: ev.target.value,
        });
    };

    const handleOk = () => {
        addTask(state);
        handleClose();
    };

    const handleStartChange = date => {
        const tmp = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours() + 1 < 24 ? date.getHours() + 1 : date.getHours(),
            date.getHours() + 1 < 24 ? date.getMinutes() : 59,
        );
        
        dispatch({
            startAt: date,
            endAt: tmp,
            duration: timeDiff(date, tmp),
        });
    };

    const handleEndChange = date => {
        const tmp = date > state.startAt ? date : state.startAt;
        dispatch({
            endAt: tmp,
            duration: timeDiff(state.startAt, tmp),
        });
    };

    const LightBlueRadio = radioGenerator(lightBlue[800], state.color, handleChange);
    const CyanRadio = radioGenerator(cyan[800], state.color, handleChange);
    const TealRadio = radioGenerator(teal[400], state.color, handleChange);
    const LightGreenRadio = radioGenerator(lightGreen[800], state.color, handleChange);
    const RedRadio = radioGenerator(red[700], state.color, handleChange);
    const BrownRadio = radioGenerator(brown[700], state.color, handleChange);
    const PurpleRadio = radioGenerator(purple[600], state.color, handleChange);
    const GreyRadio = radioGenerator(grey[800], state.color, handleChange);
    const PinkRadio = radioGenerator(pink[800], state.color, handleChange);
    const OrangeRadio = radioGenerator(orange[800], state.color, handleChange);

    return (
        <Dialog
            fullWidth
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title" disableTypography>
                <Toolbar disableGutters> 
                    <Typography id="tableTitle" className={classes.title} variant="h5" component="h2" noWrap> 
                        Add Task
                    </Typography>
                    <IconButton className={classes.closeBtn} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </DialogTitle>
            <DialogContent>
                <form noValidate>
                    <div className={classes.select}>
                        <TextField 
                            name="title"
                            id="filter-value"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={state.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.select}>
                        <TextField 
                            name="url"
                            id="filter-value"
                            label="Task URL (optional)"
                            variant="outlined"
                            fullWidth
                            value={state.url}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.flex}>
                        <LightBlueRadio/>
                        <CyanRadio/>
                        <TealRadio/>
                        <LightGreenRadio/>
                        <RedRadio/>
                        <BrownRadio/>
                        <PurpleRadio/>
                        <GreyRadio/>
                        <PinkRadio/>
                        <OrangeRadio/>
                    </div>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={6}>
                            <KeyboardDatePicker
                                fullWidth
                                format="MM/dd/yyyy"
                                margin="normal"
                                label="Date"
                                value={state.startAt}
                                onChange={handleStartChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <Typography 
                                variant="h4" 
                                component="p" 
                                align="center" 
                                className={classes.text}
                            >{state.duration.hours}h {state.duration.minutes}m</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <KeyboardTimePicker
                                fullWidth
                                ampm={false}
                                margin="normal"
                                label="Start At"
                                value={state.startAt}
                                onChange={handleStartChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <KeyboardTimePicker
                                fullWidth
                                ampm={false}
                                margin="normal"
                                label="End At"
                                value={state.endAt}
                                onChange={handleEndChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddTaskDialog;