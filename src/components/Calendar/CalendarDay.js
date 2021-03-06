import React, { Fragment } from 'react'
import {
    Paper,
    Typography
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
        marginTop: theme.spacing(0.5),
        width: "100%",
        textAlign: "left",
        paddingLeft: theme.spacing(0.5),
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
}));


const CalendarDay = ({ day, isCurrentDate, tasks }) => {
    const classes = useStyles();
    const theme = useTheme();
    useTimeChangeRefresh(5000);

    return (
        <Paper className={classes.weekDay}>
            <div className={isCurrentDate ? classes.selectedDayRing : classes.dayRing}>
                {day}
            </div>
            {tasks ? (
                <Timeline>
                    {tasks.map(t => (
                        <Fragment key={t.id}>
                            <TimelineItem>
                                <TimelineOppositeContent>
                                    <Typography color="textSecondary">{`${t.startAt} - ${t.endAt} (${t.duration})`}</Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    {t.id === 3 // TODO ! if time now
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
                                        <Typography>{t.description}</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            {t.break && (
                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography>Break</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography align="left">{t.break}</Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            )}
                        </Fragment>
                    ))}
                </Timeline>
            ) : (
                <div className={classes.center}>
                    <Typography variant="h3" component="p">:(</Typography>
                    <Typography>There is nothing to do here</Typography>
                </div>
            )}
        </Paper>
    );
};


export default CalendarDay;