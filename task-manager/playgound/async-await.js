const doWork = async () => {
    return 'Emmanuel'
}

doWork().then((result) => {
    console.log('Result', result)
}).catch((e) => {
    console.log(e)
})