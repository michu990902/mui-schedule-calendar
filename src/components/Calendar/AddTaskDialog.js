import React, { useState, useReducer } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Toolbar,
    IconButton,
    Typography,
    TextField
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'

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
}));


// {
//     id: 1,
//     date: "3/5/2021",
//     startAt: "8:00 AM",
//     endAt: "9:30 PM",
//     duration: "1:30",
//     title: "Test task",
//     description: "Test task",
//     color: lightBlue[800],
//     break: "0:30",
// },
// ! TODO

const AddTaskDialog = ({ isOpen, addTask, handleClose, selectedDay }) => {
    const classes = useStyles(); 
    const [title, setTitle] = useState('');

    // const handleCondition = ev => {
    //     setCondition(ev.target.value);
    // };

    const handleOk = () => {
        // addTask(...)
        handleClose();
    };

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
                            id="filter-value"
                            label="Value"
                            variant="outlined"
                            fullWidth
                            value={value}
                            onChange={ev => setValue(ev.target.value)}
                        />
                    </div>
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