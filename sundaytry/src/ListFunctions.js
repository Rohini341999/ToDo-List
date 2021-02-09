import axios from 'axios'

export const getList = () => {
    const proxyurl = "";
    const apiBaseUrl = "http://127.0.0.1:5000";
    return axios
        .get(proxyurl+apiBaseUrl+'/api/tasks', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach(function (key) {
                var val = res.data[key]
                data.push([val.title, val._id])
            })

            return data
        })
}

export const addToList = term => {
    const proxyurl = "";
    const apiBaseUrl = "http://127.0.0.1:5000";
    return axios
        .post(
            proxyurl+apiBaseUrl+'/api/tasks',
            {
                title: term
            },
            {
                headers: { 'Content-type': 'application/json' }
            }
        )
        .then((response) => {
            console.log(response)
        })
}

export const deleteItem = (term) => {
 
    const apiBaseUrl = "http://127.0.0.1:5000";
    return axios
        .delete(apiBaseUrl+`/api/tasks/${term}`, {
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            console.log("response"+response)
            console.log("term"+term)
        })
        .catch((response) => {
            console.log(response)
        })
}

export const updateItem = (term, id) => {
    const proxyurl = "";
    const apiBaseUrl = "http://127.0.0.1:5000";
    return axios
        .put(proxyurl+apiBaseUrl+`/api/tasks/${id}`, 
        {
            title: term
        },
        {
            headers: { 'Content-type': 'application/json' }
        }
        )
        .then((response) => {
            console.log(response)
        })
}