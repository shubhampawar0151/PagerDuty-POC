// dateUtils.ts
const datePipe = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    const date = new Date(dateString);
    return date.toLocaleString(undefined, options);
};

export default datePipe;