import React, { useState } from 'react'

import {
    Paper,
    Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { getMonthGrid } from '../../lib/calendar'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    calendarWrapper3: {
        display: 'grid',
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2,
        padding: 4,
        backgroundColor: theme.palette.divider,
    },
    calendarWrapper7: {
        display: 'grid',
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 2,
        padding: 4,
        backgroundColor: theme.palette.divider,
    },
    weekDay: {
        border: "none",
        borderRadius: 0,
        textAlign: "center",
        minHeight: 300,
    },
    monthDay: {
        border: "none",
        borderRadius: 0,
        textAlign: "center",
        minHeight: 100,
    },
}));

const dayLabels = [
    "NIEDZ.",
    "PON.",
    "WT.",
    "ŚR.",
    "CZW.",
    "PT.",
    "SOB.",
];

const Calendar = () => {
    const classes = useStyles();
    const [view, setView] = useState("month"); //day, 3days, week, month 
    const [selectedDate, setSelectedDate] = useState(new Date());

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const dayInWeek = selectedDate.getDay();

    const gridMonth = getMonthGrid(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
    const gridWeek = gridMonth.find(arr => arr.includes(day));
    const info3Days = [
        new Date(year, month, day),
        new Date(year, month, day+1),
        new Date(year, month, day+2),
    ];

    const getGrid = {
        "day": (
            <div>
                day: {day}
            </div>
        ),
        "3days": (
            <div>
                <div className={classes.calendarWrapper3}>
                    <Typography align="center">{dayLabels[info3Days[0].getDay()]}</Typography>
                    <Typography align="center">{dayLabels[info3Days[1].getDay()]}</Typography>
                    <Typography align="center">{dayLabels[info3Days[2].getDay()]}</Typography>
                    <Paper className={classes.weekDay}>{info3Days[0].getDate()}</Paper>
                    <Paper className={classes.weekDay}>{info3Days[1].getDate()}</Paper>
                    <Paper className={classes.weekDay}>{info3Days[2].getDate()}</Paper>
                </div>
            </div>
        ),
        "week": (
            <div>
                <div className={classes.calendarWrapper7}>
                    {dayLabels.map((d, id) => <Typography key={id} align="center">{d}</Typography>)}
                    {gridWeek.map((d, id) => <Paper key={id} className={classes.weekDay}>{d}</Paper>)}
                </div>
            </div>
        ),
        "month": (
            <div>
                <div className={classes.calendarWrapper7}>
                    {dayLabels.map((d, id) => <Typography key={id} align="center">{d}</Typography>)}
                    {gridMonth.flat().map((d, id) => <Paper key={id} className={classes.monthDay}>{d}</Paper>)}
                </div>
            </div>
        ),
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {getGrid[view]}
            </Paper>
        </div>
    );
};

export default Calendar;