import {API_URL} from "../common/constants";

const axios = require('axios')


function test(name){
    axios.post(`${API_URL}/users/name`, {
        "name":name
    }).then(res=>console.log(res)).catch(err=>console.log(err))
}

export default test;
