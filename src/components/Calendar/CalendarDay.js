import React, { Fragment } from 'react'
import {
    Paper,
    Typography,
    Link
} from '@material-ui/core'
import {
    Timeline,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent
} from '@material-ui/lab'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useTimeChangeRefresh } from '../../hooks/useTimeChangeRefresh'
import { getTime } from '../../lib/calendar'

const useStyles = makeStyles(theme => ({
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
    task: {
        width: "100%",
        textAlign: "left",
        padding: theme.spacing(1),
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
    center: {
        paddingTop: 100,
        paddingBottom: 100,
    },
    timeline: {
        width: '50%',
        // TODO responsive
    },
}));


const CalendarDay = ({ day, isCurrentDate, tasks }) => {
    const classes = useStyles();
    const theme = useTheme();
    useTimeChangeRefresh(5000);

    const isNow = (start, end) => {
        const now = new Date();
        return now > start && now < end;
    };

    const endOfDay = date => {
        const tmp = new Date(date);
        tmp.setHours(23,59,59,999)
        return tmp;
    };

    return (
        <Paper className={classes.weekDay}>
            <div className={isCurrentDate ? classes.selectedDayRing : classes.dayRing}>
                {day}
            </div>
            {tasks.length > 0 ? (
                <Timeline className={classes.timeline}>
                    {tasks.map((t, id) => (
                        <Fragment key={t.id}>
                            <TimelineItem>
                                <TimelineOppositeContent>
                                    <Typography>{`${getTime(t.startAt)} - ${getTime(t.endAt)}`}</Typography>
                                    <Typography color="textSecondary">
                                        {t.duration.hours > 0 && `${t.duration.hours}h `}{t.duration.minutes > 0 && `${t.duration.minutes}m`}
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    {isNow(t.startAt, t.endAt)
                                    ? <TimelineDot className={classes.timeNowDot}/> 
                                    : <TimelineDot/>}
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper 
                                        className={classes.task} 
                                        style={{ 
                                            backgroundColor: t.color, 
                                            color: theme.palette.getContrastText(t.color) 
                                        }}
                                    >
                                        <Typography variant="h6" component="h1">{t.title}</Typography>
                                        {t.description.length > 0 && (
                                            <Typography>{t.description}</Typography>
                                        )}
                                        {t.url.length > 0 && (
                                            <Link 
                                                href={t.url}
                                                rel="noreferrer"
                                                target="_blank"
                                                color="inherit"
                                            >{t.url}</Link>
                                        )}
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            {t.break && (
                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography>Break</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        {isNow(t.endAt, (tasks[id+1]||{}).startAt || endOfDay(t.endAt))
                                        ? <TimelineDot className={classes.timeNowDot}/> 
                                        : <TimelineDot/>}
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography align="left">
                                            {t.break.hours > 0 && `${t.break.hours} hours `}{t.break.minutes > 0 && `${t.break.minutes} minutes`}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            )}
                        </Fragment>
                    ))}
                </Timeline>
            ) : (
                <div className={classes.center}>
                    <Typography variant="h3" component="p">:)</Typography>
                    <br/>
                    <Typography>There is nothing to do here</Typography>
                </div>
            )}
        </Paper>
    );
};


export default CalendarDay;