const delayAsync = (timeout)=>{
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve("delay")
        }, timeout);
    })
}

export default delayAsync;
