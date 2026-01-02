const formatTime = (unix) => {

    // Convert seconds + nano`s to milliseconds:
    const ms = unix._seconds * 1000 + unix._nanoseconds / 1e6;

    const date = new Date(ms);
    
    const dateOnly = date.toISOString().split('T')[0];
    return dateOnly;
};

export default formatTime