function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export function todaysDate(){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    let todaysDate= year + "-" + pad(month,2) + "-" + pad(day,2)
    return todaysDate
}
