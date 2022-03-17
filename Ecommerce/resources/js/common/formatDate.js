const formatDate = (dateTimeString) => {
    let date = dateTimeString.split(" ")[0];
    let time = dateTimeString.split(" ")[1];

    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let day = date.split("-")[2];

    return `${month}/${day}/${year} ${time}`;
};
export default formatDate;
