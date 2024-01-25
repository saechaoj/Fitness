function fillPaymentForm() {
    let req = new Promise((resolve, reject) => {
        // setup AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", `/sales-get-all-clients`, true);
        
        xhttp.send();
    
        
        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let res = JSON.parse(xhttp.response);
                // console.log(res)
                resolve(res.data)
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                // show alert if error in query
                console.log(xhttp.response);
                alert('error');
                reject(null);
            };
        };
    });
    
    req
        .then((data) => {
            let tag = document.querySelector('#pay-sessionClient');
            let option_tag;
            for (d of data) {
                option_tag = document.createElement('option');
                option_tag.value = d.clientID;
                option_tag.innerHTML = d.Client;
                tag.appendChild(option_tag);
            };
        })
        .catch();
};