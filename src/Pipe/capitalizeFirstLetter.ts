// While displaying we need to capitalize first letter for options and other thing
const capitalizeFirstLetter = (str: string) : string => {
    if (!str) return str; // Handle null or undefined
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default capitalizeFirstLetter;
