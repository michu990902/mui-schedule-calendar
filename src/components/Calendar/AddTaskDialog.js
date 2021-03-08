import React, { useReducer, useEffect, useState } from 'react'
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
        marginTop: theme.spacing(0.5), 
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
    info: {
        marginTop: theme.spacing(2), 
        marginBottom: theme.spacing(2), 
        width: "100%",
        height: theme.spacing(4),
        background: `repeating-linear-gradient(
            45deg,
            ${theme.palette.divider},
            ${theme.palette.divider} 10px,
            ${theme.palette.action.hover} 10px,
            ${theme.palette.action.hover} 20px
        )`,
        display: 'flex',
        borderRadius: theme.spacing(0.5),
    },
    newTask: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: `#ff06 !important`,
        }
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


const AddTaskDialog = ({ isOpen, addTask, handleClose, selectedDate, tasks }) => {
    // TODO tasks time validation
    const classes = useStyles();

    const [startAt, setStartAt] = useState(new Date());
    const [endAt, setEndAt] = useState(new Date());
    const [duration, setDuration] = useState({
        hours: 0,
        minutes: 0,
    });
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState(lightBlue[800]);

    const [dayView, setDayView] = useState([]);

    console.log(tasks);

    useEffect(() => {
        let tmp = tasks[`${startAt.getDate()}/${startAt.getMonth()}/${startAt.getFullYear()}`]||[];
        if(tmp.length > 0){
            tmp = tmp.reduce((total, curr) => {
                const start = curr.startAt.getHours() * 60 + curr.startAt.getMinutes();
                const end = curr.endAt.getHours() * 60 + curr.endAt.getMinutes();
                const tmp = [...total, {
                    start,
                    end,
                    duration: end - start,
                    width: `${(end - start) / 14.4}%`, // 1440 (min in day) / 100
                    color: curr.color,
                    break: false,
                    startAt: curr.startAt,
                    endAt: curr.endAt,
                }];
                if(curr.break){
                    const dur = curr.break.diffMin;
                    const tmpD = new Date(
                        curr.endAt.getFullYear(), 
                        curr.endAt.getMonth(), 
                        curr.endAt.getDate(), 
                        curr.endAt.getHours(),
                        curr.endAt.getMinutes() + dur,
                    );
                    if(curr.endAt < tmpD){
                        tmp.push({
                            start: end,
                            end: end + dur,
                            duration: dur,
                            width: `${dur / 14.4}%`,
                            color: "transparent",
                            break: true,
                            startAt: curr.endAt,
                            endAt: tmpD,
                        });
                    }
                }
                return tmp;
            }, []);

            const end = tmp[0];
            tmp = [
                {
                    start: 0,
                    end,
                    duration: end.start,
                    width: `${end.start / 14.4}%`,
                    color: "transparent",
                    break: true,
                    startAt: new Date(
                        end.startAt.getFullYear(), 
                        end.startAt.getMonth(), 
                        end.startAt.getDate(),
                    ),
                    endAt: end.startAt,
                },
                ...tmp,
            ];
            
            const last = tmp[tmp.length - 1];
            if(last.break){
                tmp[tmp.length - 1].endAt = new Date(
                    last.startAt.getFullYear(), 
                    last.startAt.getMonth(), 
                    last.startAt.getDate(),
                    23,
                    59
                )
            }
        }
        setDayView(tmp);
    }, [tasks, startAt, selectedDate])

    useEffect(() => {
        const tmp = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            selectedDate.getHours() + 1 < 24 ? selectedDate.getHours() + 1 : selectedDate.getHours(),
            selectedDate.getHours() + 1 < 24 ? selectedDate.getMinutes() : 59,
        );

        setStartAt(selectedDate);
        setEndAt(tmp);
        setDuration(timeDiff(selectedDate, tmp));
    }, [selectedDate]);

    const setTaskTime = brk => {
        console.log(brk);
        setStartAt(brk.startAt);
        setEndAt(brk.endAt);
        setDuration(timeDiff(brk.startAt, brk.endAt));
    };

    const handleOk = () => {
        addTask({
            id: ~~(Math.random() * 1000000), // TODO
            startAt,
            endAt,
            duration,
            title,
            url,
            description,
            color
        });
        handleClose();
        setTitle('');
        setUrl('');
        setDescription('');
    };

    const handleStartChange = date => {
        const tmp = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours() + 1 < 24 ? date.getHours() + 1 : date.getHours(),
            date.getHours() + 1 < 24 ? date.getMinutes() : 59,
        );
        setStartAt(date);
        setEndAt(tmp);
        setDuration(timeDiff(date, tmp));
    };

    const handleEndChange = date => {
        const tmp = date > startAt ? date : startAt;
        setEndAt(date);
        setDuration(timeDiff(startAt, tmp));
    };

    const handleColor = ev => {
        setColor(ev.target.value);
    };

    const LightBlueRadio = radioGenerator(lightBlue[800], color, handleColor);
    const CyanRadio = radioGenerator(cyan[800], color, handleColor);
    const TealRadio = radioGenerator(teal[400], color, handleColor);
    const LightGreenRadio = radioGenerator(lightGreen[800], color, handleColor);
    const RedRadio = radioGenerator(red[700], color, handleColor);
    const BrownRadio = radioGenerator(brown[700], color, handleColor);
    const PurpleRadio = radioGenerator(purple[600], color, handleColor);
    const GreyRadio = radioGenerator(grey[800], color, handleColor);
    const PinkRadio = radioGenerator(pink[800], color, handleColor);
    const OrangeRadio = radioGenerator(orange[800], color, handleColor);

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
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <div className={classes.select}>
                        <TextField 
                            name="url"
                            id="filter-value"
                            label="Task URL (optional)"
                            variant="outlined"
                            fullWidth
                            value={url}
                            onChange={ev => setUrl(ev.target.value)}
                            autoComplete="off"
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
                                value={startAt}
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
                            >{duration.hours}h {duration.minutes}m</Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.info}>
                        {dayView.map((t, i) => t.break ? (
                            <div
                                key={i}
                                style={{
                                    width: t.width,
                                    backgroundColor: t.color,
                                }}
                                className={classes.newTask}
                                onClick={() => setTaskTime(t)}
                            ></div>
                        ) : (
                            <div
                                key={i}
                                style={{
                                    width: t.width,
                                    backgroundColor: t.color,
                                }}
                            ></div>
                        ))}
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <KeyboardTimePicker
                                fullWidth
                                ampm={false}
                                margin="normal"
                                label="Start At"
                                value={startAt}
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
                                value={endAt}
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