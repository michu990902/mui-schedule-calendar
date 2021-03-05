import React, { useState } from 'react'
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

const AddTaskDialog = ({ isOpen, addFilter, handleClose, columns }) => {
    const classes = useStyles(); 
    const [fieldName, setFieldName] = useState('name');
    const [condition, setCondition] = useState('equal');
    const [value, setValue] = useState('');

    const handleCondition = ev => {
        setCondition(ev.target.value);
    };

    const handleOk = () => {
        const col = columns.find(c => c.id === fieldName);
        const lbl = getConditions[col.type].find(c => c.id === condition).label;
        addFilter(col.id, col.label, col.type, condition, lbl, value);
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