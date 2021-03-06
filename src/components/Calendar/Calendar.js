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
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { getMonthGrid } from '../../lib/calendar'

import AddIcon from '@material-ui/icons/Add'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { teal, lightBlue, cyan, lightGreen, red, brown, grey, purple, pink, orange } from '@material-ui/core/colors'

import CalendarDay from './CalendarDay'

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
    task: {
        marginTop: theme.spacing(0.5),
        width: "100%",
        textAlign: "left",
        paddingLeft: theme.spacing(0.5),
        boxSizing: "border-box",
    },
    break: {
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(1),
        width: "100%",
        textAlign: "left",
        padding: theme.spacing(0.5),
        borderLeft: `2px solid ${theme.palette.divider}`,
        boxSizing: "border-box",
    },
    "@keyframes timeNowAnimation": {
        "from": {
            backgroundColor: theme.palette.divider,
        },
        "to": {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    timeNowDot: {
        animation: `$timeNowAnimation 1000ms ease-in-out alternate infinite`,
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

const tasks = [
    {
        id: 1,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "1:30",
        title: "Test task",
        description: "Test task",
        color: lightBlue[800],
        break: "0:30",
    },
    {
        id: 2,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "0:10",
        title: "Test task 2",
        description: "Test task 2",
        color: cyan[800],
    },
    {
        id: 3,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "0:10",
        title: "Test task 3",
        description: "Test task 3",
        color: teal[700],
        break: "0:15",
    },
    {
        id: 4,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "0:10",
        title: "Test task 4",
        description: "Test task 4",
        color: lightGreen[800],
    },
    {
        id: 5,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "0:10",
        title: "Test task 5",
        description: "Test task 5",
        color: red[700],
    },
    {
        id: 6,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "0:10",
        title: "Test task 6",
        description: "Test task 6",
        color: brown[700],
    },
    {
        id: 7,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "0:10",
        title: "Test task 7",
        description: "Test task 7",
        color: purple[600],
    },
    {
        id: 8,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "0:10",
        title: "Test task 8",
        description: "Test task 8",
        color: grey[800],
    },
    {
        id: 9,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "0:10",
        title: "Test task 9",
        description: "Test task 9",
        color: pink[700],
    },
    {
        id: 10,
        date: "3/5/2021",
        startAt: "8:00 AM",
        endAt: "9:30 PM",
        duration: "0:10",
        title: "Test task 10",
        description: "Test task 10",
        color: orange[900],
    },
];

const Calendar = ({ title }) => {
    const classes = useStyles();
    const theme = useTheme();
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
            <CalendarDay
                day={day}
                isCurrentDate={isCurrDate({ year, month, day })}
                tasks={tasks}
            />
        ),
        "3days": (
            <div className={classes.calendarWrapper3}>
                {info3Days.map((d, id) => <Typography key={id} align="center">{dayNames[d.getDay()]}</Typography>)}
                {grid3Days.map((d, id) => (
                    <Paper key={id} className={classes.weekDay}>
                        <div className={isCurrDate(d) ? classes.selectedDayRing : classes.dayRing}>
                            {d.day}
                        </div>
                        {tasks && tasks.map(t => (
                            <>
                                <Paper
                                    key={t.id}
                                    className={classes.task} 
                                    style={{ 
                                        backgroundColor: t.color, 
                                        color: theme.palette.getContrastText(t.color) 
                                    }}
                                >
                                    <Typography variant="body2">{t.title}</Typography>
                                    <Typography variant="caption">{`${t.startAt} - ${t.endAt} (${t.duration})`}</Typography>
                                </Paper>
                                {t.break && <div className={classes.break}>{t.break}</div>}
                            </>
                        ))}
                    </Paper>
                ))}
            </div>
        ),
        "week": (
            <div className={classes.calendarWrapper7}>
                {dayNames.map((d, id) => <Typography key={id} align="center">{d}</Typography>)}
                {gridWeek.map((d, id) => (
                    <Paper key={id} className={classes.weekDay}>
                        <div className={isCurrDate(d) ? classes.selectedDayRing : classes.dayRing}
                        >
                            {d.day}
                        </div>
                        {tasks && tasks.map(t => (
                            <Paper
                                key={t.id}
                                className={classes.task} 
                                style={{ 
                                    backgroundColor: t.color, 
                                    color: theme.palette.getContrastText(t.color) 
                                }}
                            >
                                <Typography variant="body2">{t.title}</Typography>
                                <Typography variant="caption">{`${t.startAt} - ${t.endAt} (${t.duration})`}</Typography>
                            </Paper>
                        ))}
                    </Paper>
                ))}
            </div>
        ),
        "month": (
            <div className={classes.calendarWrapper7}>
                {dayNames.map((d, id) => <Typography key={id} align="center">{d}</Typography>)}
                {gridMonth.flat().map((d, id) => (
                    <Paper key={id} className={classes.monthDay}>
                        <div className={isCurrDate(d) ? classes.selectedDayRing : classes.dayRing}
                        >
                            {d.day}
                        </div>
                        {tasks && tasks.map(t => (
                            <Paper 
                                key={t.id}
                                className={classes.task} 
                                style={{ 
                                    backgroundColor: t.color, 
                                    color: theme.palette.getContrastText(t.color) 
                                }}
                            >
                                <Typography variant="caption">{`${t.startAt} - ${t.title}`}</Typography>
                            </Paper>
                        ))}
                    </Paper>
                ))}
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