const capitalizeFirstLetter = (str: string) : string => {
    if (!str) return str; // Handle null or undefined
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default capitalizeFirstLetter;
