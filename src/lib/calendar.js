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