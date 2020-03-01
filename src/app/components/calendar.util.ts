import * as moment from 'moment';

export function generateArray(number) {
    const result = [];
    for(let item = 0; item < number; item++) {
        result.push(item);
    }
    return result;
}

export function calculateColumnNumber(date: string[] | Date[]) {
    let [ first, second ] = date;
    const today = new Date();
    let start = first;
    let end = second;
    if (!second) {
        if (moment(first).isBefore(today)) {
            start = first;
            end = today;
        } else {
            start = today;
            end = first;
        }
    }
    const startWeekNum = moment(start).format('d'); // 0, 1, ..., 6(周日 - 周六)
    const firstWeekNum = 7 - +startWeekNum;
    const endWeekNum = moment(end).format('d');
    const lastWeekNum = +endWeekNum + 1;
    const diffDay = moment(end).diff(moment(start), 'day') + 1;
    const columnNum = (diffDay - firstWeekNum - lastWeekNum) / 7 + 2;
    return columnNum;
}

export function transpose(A) {
    let result = [], rowItem = [];
    const rows = A.length;
    const cols = A[0].length;
    for(let i = 0;i < cols;i++){  
        rowItem = [];
        for(let j = 0;j < rows;j++){
          rowItem.push(A[j][i]);
        }
        result.push(rowItem);
    }
    return result;
}

// export function transpose(A) {
//     const rows = A.length;
//     const cols = A[0].length;
//     const result = new Array(cols).fill(new Array(rows).fill());
//     for(let i=0;i<cols;i++){  
//       result[i] = [];
//       for(let j=0;j<rows;j++){
//         result[i][j] = A[j][i];
//       }
//     }
//     return result;
//   }

/**
 * 获取某一周的周数组
 * @param {某个日期} date 
 * @param {第几周} num 
 * @param {数组的值的格式} format 
 */
export function getWeekArr(date, num, showOtherMonth) {
    let weekArr = [];
    let dateMoment = date;
    if(!moment.isMoment(date)){
        dateMoment = moment(date);
    }
    const thisMonth = dateMoment.format('M');
    let index = dateMoment.format('d');
    let firstDay = -index+num*7;
    let lastDay = 7-index+num*7;
    for(let day=firstDay;day<lastDay;day++){
        let weekItem = moment(dateMoment).add(day, 'days');
        let formatWeekItem = weekItem;
        if(!showOtherMonth && thisMonth !== formatWeekItem.format('M')){
            formatWeekItem = null;
        }
        weekArr.push(formatWeekItem);
    }
    return weekArr;
}

/**
 * 获取一个月的第一天
 * @param {某个日期} date 
 */
export function getFirstDayOfMonth(date, monthNum, yearNum) {
    let dateMoment = date;
    if(!moment.isMoment(date)){
        dateMoment = moment(date);
    }
    let year = moment(dateMoment).add(yearNum, 'years').add(monthNum, 'months').format('YYYY');
    let month = moment(dateMoment).add(yearNum, 'years').add(monthNum, 'months').format('MM');
    // let month = dateMoment.format('MM');
    let day = '01';
    let firstDayOfMonth = year+'-'+month+'-'+day;
    return firstDayOfMonth;
}

/**
 * 获取日历数组
 * @param {某个日期} date 
 */
export function getCalendarArr(date, monthNum=0, yearNum=0, showOtherMonth=true) {
    const DATE_ROW_COUNT = 6;
    let calendarArr = [];
    let firstDayOfMonth = getFirstDayOfMonth(date, monthNum, yearNum);
    for(let row=0;row<DATE_ROW_COUNT;row++){
        let rowArr = getWeekArr(firstDayOfMonth, row, showOtherMonth);
        calendarArr.push(rowArr);
    }
    return calendarArr;
}