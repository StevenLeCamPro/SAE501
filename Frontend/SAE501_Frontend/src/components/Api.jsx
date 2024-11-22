import ApiRouter from "./ApiRouter";

function Api(table, method, id, content) {

    const url = ApiRouter(table, method, id)

    const requestOptions = {
        method: method.toUpperCase(),
        headers: { 'Content-Type': 'application/json' },
    };

    if (content) {
        requestOptions.body = JSON.stringify(content);
    }

    console.log(requestOptions)

    switch (method) {

        case "post":
            return fetch(url, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    throw error;
                });

        case "get":
            if (id) {
                fetch(url)
                    .then((response) => { return response.json() })
            } else {
                fetch(url)
                    .then((response) => { return response.json() })
            }

        case "put":
            return fetch(url, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    throw error;
                });

        case "delete":
            return fetch(url, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    throw error;
                });
    }

}

export default Api