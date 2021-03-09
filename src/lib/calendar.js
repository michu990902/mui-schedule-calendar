export const getMonthGrid = (year, month) => {
    const date = new Date(year, month, 0);
    const monthLength = date.getDate();
    date.setDate(1);
    let firstDay = date.getDay(); //Sunday - Saturday : 0 - 6
    let grid = [];
    let tmpWeek = 0;
    let total = 0;

    const insertDayToWeek = day => {
        total++;
        const len = grid.length;
        const lastItemID = len > 0 ? len - 1 : 0;
        const lastItem = grid[lastItemID] || [];
        if(tmpWeek > 0){
            grid[lastItemID] = [...lastItem, day];
            tmpWeek--;
            return;
        }
        grid.push([day]);
        tmpWeek = 6;
    }

    if(firstDay !== 0){
        const tmpDate = new Date(year, month-1, 0);
        const tmpYear = tmpDate.getFullYear();
        const tmpMonth = tmpDate.getMonth();
        const lastMonthLength = tmpDate.getDate();
        while(firstDay){
            const day = lastMonthLength - --firstDay;
            insertDayToWeek({ year: tmpYear, month: tmpMonth, day });
        }
    }

    let i = 1;
    while(i < monthLength+1) insertDayToWeek({ year, month: month-1, day: i++ });
    i = 1;
    const tmpDate = new Date(year, month+1, 0);
    const tmpYear = tmpDate.getFullYear();
    const tmpMonth = tmpDate.getMonth();
    while(total%7 > 0) insertDayToWeek({ year: tmpYear, month: tmpMonth, day: i++ });

    return grid;
};

const addZero = value => ('0'+value).slice(-2);
export const getTime = date => `${date.getHours()}:${addZero(date.getMinutes())}`;

export const timeDiff = (from, to) => {
    const diffMin = Math.ceil(Math.ceil((to - from) / 1000) / 60);
    const hoursLeft = ~~(diffMin / 60);
    const minutesLeft = ~~(diffMin % 60);
    return {
        diffMin: diffMin,
        hours: hoursLeft,
        minutes: minutesLeft,
        label: `${hoursLeft}:${addZero(minutesLeft)}`,
    };
}

export const groupTasks = tasks => {
    if(tasks.length === 0) return {};

    const tmp = tasks.sort((a ,b) => {
        if(a.startAt < b.startAt) return -1;
        if(a.startAt > b.startAt) return 1;
        return 0;
    })
    .map(t => ({
        ...t,
        width: `${((t.endAt.getHours() * 60 + t.endAt.getMinutes()) - (t.startAt.getHours() * 60 + t.startAt.getMinutes())) / 14.4}%`,
    }))
    .reduce((total, curr) => {
        const id = `${curr.startAt.getDate()}/${curr.startAt.getMonth()}/${curr.startAt.getFullYear()}`;
        return {...total, [id]: [...(total[id]||[]), curr]};
    }, {});

    for(let day in tmp){
        let dayTasks = tmp[day];
        const len = dayTasks.length;
        if(len === 0) continue;
        
        //mid
        if(len > 1){
            let mb = [dayTasks[0]];
            for(let i = 1; i < len; i++) {
                const prev = dayTasks[i-1];
                const curr = dayTasks[i];
                if(curr.startAt - prev.endAt > 0){
                    mb = [...mb, {
                        isBreak: true,
                        startAt: prev.endAt,
                        endAt: curr.startAt,
                        width: `${((curr.startAt.getHours() * 60 + curr.startAt.getMinutes()) - (prev.endAt.getHours() * 60 + prev.endAt.getMinutes())) / 14.4}%`,
                        info: timeDiff(prev.endAt, curr.startAt),
                    }, curr];
                }else{
                    mb = [...mb, curr];
                }
            }
            dayTasks = mb;
        }

        //first
        const fsa = dayTasks[0].startAt;
        const ds = new Date(fsa.getFullYear(), fsa.getMonth(), fsa.getDate());
        if(fsa - ds > 0){
            dayTasks = [{
                isBreak: true,
                startAt: ds,
                endAt: fsa,
                width: `${((fsa.getHours() * 60 + fsa.getMinutes()) - (ds.getHours() * 60 + ds.getMinutes())) / 14.4}%`,
                info: timeDiff(ds, fsa),
            }, ...dayTasks];
        }

        //last
        const lea = dayTasks[dayTasks.length - 1].endAt;
        const de = new Date(fsa.getFullYear(), fsa.getMonth(), fsa.getDate(), 23, 59);
        if(de - lea > 0){
            dayTasks = [...dayTasks, {
                isBreak: true,
                startAt: lea,
                endAt: de,
                width: `${((de.getHours() * 60 + de.getMinutes()) - (lea.getHours() * 60 + lea.getMinutes())) / 14.4}%`,
                info: timeDiff(lea, de),
            }];
        }
        
        tmp[day] = dayTasks;
    }

    return tmp;
};