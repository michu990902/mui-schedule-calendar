import React, { useState, useEffect, Fragment } from 'react'

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

import CalendarDay from './CalendarDay'
import AddTaskDialog from './AddTaskDialog'
import { timeDiff, getTime } from '../../lib/calendar'

import { testData } from './testData'

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

const groupTasks = tasks => tasks.reduce((total, curr, id) => {
    const prevTask = total[id-1];
    if(prevTask){
        const diff = timeDiff(prevTask.endAt, curr.startAt);
        // console.log("error", prevTask.endAt, curr.startAt, diff)
        // WTF not exist
        if(diff.hours > 0 || diff.minutes > 14){ // only > 14 minutes breaks
            total[id-1].break = diff;
        }
    }
    return [...total, curr];
}, []).reduce((total, curr) => {
    const id = `${curr.startAt.getDate()}/${curr.startAt.getMonth()}/${curr.startAt.getFullYear()}`;
    return {...total, [id]: [...(total[id]||[]), curr]};
}, {});

const Calendar = ({ title }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [view, setView] = useState("month"); //day, 3days, week, month 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [tasks, setTasks] = useState(testData);
    const [groupedTasks, setGroupedTasks] = useState({});

    useEffect(() => {
        const tmp = tasks.sort((a ,b) => {
            if(a.startAt < b.startAt) return -1;
            if(a.startAt > b.startAt) return 1;
            return 0;
        });
        if(tmp.length > 0){
            const lt = tmp[tmp.length - 1];
            tmp[tmp.length - 1].break = timeDiff(
                lt.endAt, 
                new Date(lt.endAt.getFullYear(), lt.endAt.getMonth(), lt.endAt.getDate(), 29, 59, 59)
            );
            setGroupedTasks(groupTasks(tmp));
        }else{
            setGroupedTasks({});
        }
    }, [tasks])

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

    const addTask = task => {
        setTasks(prev => [...prev, task])
    };

    const getGrid = {
        "day": (
            <CalendarDay
                day={day}
                isCurrentDate={isCurrDate({ year, month, day })}
                tasks={groupedTasks[`${day}/${month}/${year}`]||[]}
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
                        {(groupedTasks[`${d.day}/${d.month}/${d.year}`]||[]).map((t, index) => (
                            <Fragment key={t.id}>
                                <Paper
                                    className={classes.task} 
                                    style={{ 
                                        backgroundColor: t.color, 
                                        color: theme.palette.getContrastText(t.color) 
                                    }}
                                >
                                    <Typography variant="body2">{t.title}</Typography>
                                    <Typography variant="caption">{`${getTime(t.startAt)} - ${getTime(t.endAt)} (${t.duration.label})`}</Typography>
                                </Paper>
                                {t.break
                                 && index < (groupedTasks[`${d.day}/${d.month}/${d.year}`]||[]).length -1
                                 && <div className={classes.break}>{t.break.label}</div>}
                            </Fragment>
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
                        {(groupedTasks[`${d.day}/${d.month}/${d.year}`]||[]).map(t => (
                            <Paper
                                key={t.id}
                                className={classes.task} 
                                style={{ 
                                    backgroundColor: t.color, 
                                    color: theme.palette.getContrastText(t.color) 
                                }}
                            >
                                <Typography variant="body2">{t.title}</Typography>
                                <Typography variant="caption">{`${getTime(t.startAt)} - ${getTime(t.endAt)} (${t.duration.label})`}</Typography>
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
                        {(groupedTasks[`${d.day}/${d.month}/${d.year}`]||[]).map(t => (
                            <Paper 
                                key={t.id}
                                className={classes.task} 
                                style={{ 
                                    backgroundColor: t.color, 
                                    color: theme.palette.getContrastText(t.color) 
                                }}
                            >
                                <Typography variant="caption">{`${getTime(t.startAt)} - ${t.title}`}</Typography>
                            </Paper>
                        ))}
                    </Paper>
                ))}
            </div>
        ),
    }

    return (
        <div className={classes.root}>
            <AddTaskDialog
                isOpen={alertVisibility}
                addTask={addTask}
                handleClose={() => setAlertVisibility(false)}
                selectedDate={selectedDate}
                tasks={groupedTasks}
            />
            <Toolbar disableGutters> 
                <Typography id="tableTitle" className={classes.title} variant="h6" noWrap> 
                    {title}
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => setAlertVisibility(true)}
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