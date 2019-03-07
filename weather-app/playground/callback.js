setTimeout(()=>{
  console.log('Two secods are up')
}, 2000)

 const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            lat: 0,
            long: 0
        }
        callback(data);
    }, 2000);
 }

 geocode('Kumasi', ((data)=> {
     console.log(data);
 }))