



const reduceStringLength = (string, maxLength) => {
    return string.length > maxLength ? string.slice(0, maxLength) + '...' : string;
}



export default reduceStringLength;