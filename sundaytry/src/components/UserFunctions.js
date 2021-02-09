import axios from 'axios'

export const register = newUser => {
    const apiBaseUrl = "http://127.0.0.1:5000";
    return axios
        .post(apiBaseUrl+"/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            username: newUser.username,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered")
        })
}

export const login = user => {
    const apiBaseUrl = "http://127.0.0.1:5000";
    return axios
        .post(apiBaseUrl+"/login", {
            username: user.username,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            console.log(response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}