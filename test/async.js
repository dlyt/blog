async function rejectionWithReturnAwait() {
    try {
        const result = await Promise.reject(new Error());
        return result;
    } catch (e) {
        return "Saved!";
    }
}
async function rejectionWithReturn() {
    try {
        const result = Promise.reject(new Error());
        return result;
    } catch (e) {
        console.log(e)
        return "Saved!";
    }
}
// rejectionWithReturnAwait().catch(err => {console.log(1)})
rejectionWithReturn().catch(err => {console.log(1)})