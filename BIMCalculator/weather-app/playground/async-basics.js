console.log("Starting app");

setTimeout(()=>{
 console.log("Inside of callback");
}, 2000);

setTimeout(()=>{
    console.log("Callback message")
});
console.log("Finishing up")