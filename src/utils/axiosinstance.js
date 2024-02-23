import axios from "axios"

const instance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API,
   
    headers:{
        'Content-Type':'application/json'
    },
    validateStatus: function (status) {
        return status >= 200 && status <=500
    }
})

export default instance