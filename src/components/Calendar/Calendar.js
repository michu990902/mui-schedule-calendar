import React, { useState } from 'react'

import {
    Paper,
    Typography,
    Toolbar,
    Button,
    Box,
    IconButton,
    ButtonGroup
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getMonthGrid } from '../../lib/calendar'

import AddIcon from '@material-ui/icons/Add'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(1),
    },
    monthDay: {
        border: "none",
        borderRadius: 0,
        textAlign: "center",
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(1),
    },
    title: { 
        flexGrow: 1,
    },
    dayRing: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    selectedDayRing: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    selectedBtn: {
        backgroundColor: theme.palette.divider,
    },
    iconBtn: {
        marginRight: theme.spacing(1),
    },
}));

const dayNames = [
    "SUN.",
    "MON.",
    "TUE.",
    "WED.",
    "THU.",
    "FRI.",
    "SAT.",
];

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const Calendar = ({ title }) => {
    const classes = useStyles();
    const [view, setView] = useState("month"); //day, 3days, week, month 
    const [selectedDate, setSelectedDate] = useState(new Date());

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const currDate = (d => ({ year: d.getFullYear(), month: d.getMonth(), day: d.getDate() }))(new Date());
    const isCurrDate = d => currDate.year === d.year && currDate.month === d.month && currDate.day === d.day;

    const gridMonth = getMonthGrid(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
    const gridWeek = gridMonth.find(arr => arr.some(d => d.day === day && d.month === month));
    const info3Days = [
        new Date(year, month, day),
        new Date(year, month, day+1),
        new Date(year, month, day+2),
    ];
    const grid3Days = info3Days.map(d => ({ year: d.getFullYear(), month: d.getMonth(), day: d.getDate() }));

    const handleGoBack = () => {
        const tmpDate = {
            "day": new Date(year, month, day-1),
            "3days": new Date(year, month, day-3),
            "week": new Date(year, month, day-7),
            "month": new Date(year, month-1, day),
        }[view];
        setSelectedDate(tmpDate);
    };

    const handleGoForth = () => {
        const tmpDate = {
            "day": new Date(year, month, day+1),
            "3days": new Date(year, month, day+3),
            "week": new Date(year, month, day+7),
            "month": new Date(year, month+1, day),
        }[view];
        setSelectedDate(tmpDate);
    };

    const handleToday = () => {
        setSelectedDate(new Date());
    }

    const getGrid = {
        "day": (
            <div>
                <Paper className={classes.weekDay}>
                    <div className={isCurrDate({ year, month, day }) ? classes.selectedDayRing : classes.dayRing}>
                        {day}
                    </div>
                    
                    <Typography variant="h3" component="p">:(</Typography>
                    There is nothing to do here
                </Paper>
            </div>
        ),
        "3days": (
            <div>
                <div className={classes.calendarWrapper3}>
                    {info3Days.map((d, id) => <Typography key={id} align="center">{dayNames[d.getDay()]}</Typography>)}
                    {grid3Days.map((d, id) => (
                        <Paper key={id} className={classes.weekDay}>
                            <div className={isCurrDate(d) ? classes.selectedDayRing : classes.dayRing}>
                                {d.day}
                            </div>
                        </Paper>
                    ))}
                </div>
            </div>
        ),
        "week": (
            <div>
                <div className={classes.calendarWrapper7}>
                    {dayNames.map((d, id) => <Typography key={id} align="center">{d}</Typography>)}
                    {gridWeek.map((d, id) => (
                        <Paper key={id} className={classes.weekDay}>
                            <div className={isCurrDate(d) ? classes.selectedDayRing : classes.dayRing}
                            >
                                {d.day}
                            </div>
                        </Paper>
                    ))}
                </div>
            </div>
        ),
        "month": (
            <div>
                <div className={classes.calendarWrapper7}>
                    {dayNames.map((d, id) => <Typography key={id} align="center">{d}</Typography>)}
                    {gridMonth.flat().map((d, id) => (
                        <Paper key={id} className={classes.monthDay}>
                            <div className={isCurrDate(d) ? classes.selectedDayRing : classes.dayRing}
                            >
                                {d.day}
                            </div>
                        </Paper>
                    ))}
                </div>
            </div>
        ),
    }

    return (
        <div className={classes.root}>
            <Toolbar disableGutters> 
                <Typography id="tableTitle" className={classes.title} variant="h6" noWrap> 
                    {title}
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => {}}
                    startIcon={<AddIcon />}
                >
                    Add Task
                </Button>
            </Toolbar>
            <Paper>
                <Box p={1}>
                    <Toolbar disableGutters>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleToday}
                        >
                            Today
                        </Button>
                        <Box p={1}>
                            <IconButton onClick={handleGoBack}>
                                <NavigateBeforeIcon/>
                            </IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={handleGoForth}>
                                <NavigateNextIcon/>
                            </IconButton>
                        </Box>
                        <Typography id="tableTitle" className={classes.title} variant="h6" noWrap> 
                            {view === "day" && day} {monthNames[month]} {year}
                        </Typography>
                        <ButtonGroup>
                            {
                                [
                                    { label: "Day", value: "day" },
                                    { label: "3 days", value: "3days" },
                                    { label: "Week", value: "week" },
                                    { label: "Month", value: "month" },
                                ].map((btn, id) => (
                                    <Button
                                        key={id}
                                        size="large"
                                        onClick={() => setView(btn.value)}
                                        className={view === btn.value ? classes.selectedBtn : null}
                                    >
                                        {btn.label}
                                    </Button>
                                ))
                            }
                        </ButtonGroup>
                    </Toolbar>
                </Box>
                <Paper className={classes.paper}>
                    {getGrid[view]}
                </Paper>
            </Paper>
        </div>
    );
};

export default Calendar;