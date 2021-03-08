import { teal, lightBlue, cyan, lightGreen, red, brown, grey, purple, pink, orange } from '@material-ui/core/colors'

export const testData = [
    {
        id: 1,
        startAt: new Date(2021, 2, 8, 8),
        endAt: new Date(2021, 2, 8, 8, 10),
        duration: {
            diffMin: 10,
            hours: 0,
            minutes: 10,
            label: "0:10",
        },
        title: "Test task",
        description: "Test task",
        color: lightBlue[800],
        url: "",
    },
    {
        id: 2,
        startAt: new Date(2021, 2, 8, 8, 10),
        endAt: new Date(2021, 2, 8, 9),
        duration: {
            diffMin: 50,
            hours: 0,
            minutes: 50,
            label: "0:50",
        },
        title: "Test task 2",
        description: "Test task 2",
        color: cyan[800],
        url: "",
    },
    {
        id: 3,
        startAt: new Date(2021, 2, 8, 9, 20),
        endAt: new Date(2021, 2, 8, 10),
        duration: {
            diffMin: 40,
            hours: 0,
            minutes: 40,
            label: "0:40",
        },
        title: "Test task 3",
        description: "Test task 3",
        color: teal[700],
        url: "",
    },
    {
        id: 4,
        startAt: new Date(2021, 2, 8, 15),
        endAt: new Date(2021, 2, 8, 17),
        duration: {
            diffMin: 120,
            hours: 2,
            minutes: 0,
            label: "2:00",
        },
        title: "Test task 4",
        description: "Test task 4",
        color: lightGreen[800],
        url: "",
    },
    {
        id: 5,
        startAt: new Date(2021, 2, 8, 17, 5),
        endAt: new Date(2021, 2, 8, 18),
        duration: {
            diffMin: 55,
            hours: 0,
            minutes: 55,
            label: "0:55",
        },
        title: "Test task 5",
        description: "Test task 5",
        color: red[700],
        url: "",
    },
    {
        id: 6,
        startAt: new Date(2021, 2, 9, 8),
        endAt: new Date(2021, 2, 9, 9, 30),
        duration: {
            diffMin: 90,
            hours: 1,
            minutes: 30,
            label: "1:30",
        },
        title: "Test task 6",
        description: "Test task 6",
        color: brown[700],
        url: "",
    },
    {
        id: 7,
        startAt: new Date(2021, 2, 9, 9, 45),
        endAt: new Date(2021, 2, 9, 10, 45),
        duration: {
            diffMin: 60,
            hours: 1,
            minutes: 0,
            label: "1:00",
        },
        title: "Test task 7",
        description: "Test task 7",
        color: purple[600],
        url: "",
    },
    {
        id: 8,
        startAt: new Date(2021, 2, 10, 8),
        endAt: new Date(2021, 2, 10, 11),
        duration: "3:00",
        duration: {
            diffMin: 180,
            hours: 3,
            minutes: 0,
            label: "3:00",
        },
        title: "Test task 8",
        description: "Test task 8",
        color: grey[800],
        url: "",
    },
    {
        id: 9,
        startAt: new Date(2021, 2, 10, 14),
        endAt: new Date(2021, 2, 10, 15),
        duration: {
            diffMin: 60,
            hours: 1,
            minutes: 0,
            label: "1:00",
        },
        title: "Test task 9",
        description: "Test task 9",
        color: pink[700],
        url: "",
    },
    {
        id: 10,
        startAt: new Date(2021, 2, 10, 15, 15),
        endAt: new Date(2021, 2, 10, 16, 15),
        duration: {
            diffMin: 60,
            hours: 1,
            minutes: 0,
            label: "1:00",
        },
        title: "Test task 10",
        description: "Test task 10",
        color: orange[900],
        url: "",
    },
];