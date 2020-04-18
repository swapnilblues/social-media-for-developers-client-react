const axios = require('axios')


function test(name){
    axios.post(`http://localhost:3002/codebook/users/name`, {
        "name":name
    }).then(res=>console.log(res)).catch(err=>console.log(err))
}

module.exports = test;
