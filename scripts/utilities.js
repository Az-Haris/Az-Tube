
function getTimeString(time){
    const totalDay = parseInt(time / 86400);
    const year = parseInt(totalDay / 365);
    const day = totalDay % 365;
    const remainingSecFromDay = time % 86400;
    const hour = parseInt(remainingSecFromDay / 3600);
    const remainingSecFromHour = remainingSecFromDay % 3600;
    const minute = parseInt(remainingSecFromHour / 60);
    const second = remainingSecFromHour % 60;

    if(minute === 0){
        return `${second}s ago`;
    } else if(hour === 0){
        return `${minute}m ${second}s ago`;
    } else if(day === 0){
        return `${hour}h ${minute}m ${second}s ago`;
    } else if(year === 0){
        return `${day}d ${hour}h ${minute}m ${second}s ago`;
    } else{
        return `${year}y ${day}d ${hour}h ${minute}m ${second}s ago`;
    }    
}