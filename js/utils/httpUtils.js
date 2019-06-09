import queryString from 'querystring'


export default class HttpUtils {
    static get(url) {
        return new Promise((resolve, reject) => {
            console.log(url)
            fetch(url, {
                mathod: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                }
            })
                // .then((response) => response.json())
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    console.log('error', error)
                    reject(error)
                })
        })
    }

    static post(url, data, headers) {
        return new Promise((resolve, reject) => {
            console.log(url)
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: queryString.stringify(data)
            })
                // .then((response) => response.json())
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}