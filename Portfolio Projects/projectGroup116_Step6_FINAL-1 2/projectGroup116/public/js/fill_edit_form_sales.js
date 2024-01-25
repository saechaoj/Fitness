// code for deleteRow using regular javascript/xhttp
function fillEditFormSales(editID, payForm=false) {
    // let dataRow = document.getElementById(`${editID}`);
    // let columns = dataRow.getElementsByClassName('data-col');

    // fill client selector
    const send_req = new Promise((resolve, reject) => {
        // Setup our AJAX request
        // first get the name attribute of body tag
        let pageName = 'sales-get-all-clients';
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", `/${pageName}`);
        xhttp.setRequestHeader("Content-type", "application/json");
        
        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));  
        
        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status >= 200 && xhttp.status < 400) {
                // successful post, resolve promise
                resolve();
                // on successful post
                // reset form
                // reload page to get new
                // payForm.reset();
                // window.location.reload();

            }
            else if (xhttp.readyState == 4) {
                // unsuccessful post, reject promise
                reject(xhttp.responseText);
                // show alert if error in query
                // console.log(xhttp.responseText);
                // alert(xhttp.responseText);
            }
        }      
    });

    send_req
        .then(() => {
            payForm.reset();
            window.location.reload();
        })
        .catch((res) => {
            console.log(res);
            alert(res);
        });

    // get html collection of input tags in the edit form
    let editForm;

    if (payForm) {
        editForm = document.getElementById('pay-form');
    } else {
        editForm = document.getElementById('edit-form');
        let tag;
        let tag_ids = [
            '#edit-sessionClient',
            '#edit-sessionTime',
            '#edit-sessionDate',
            '#edit-sessionTrainer'
        ];
        for (let tagid of tag_ids) {
            tag = document.querySelector(tagid);
            tag.selectedIndex = 0;
            tag.disabled = true;
            tag.required = false;
        };

            // fill select form elements
        let select_type_tag = document.querySelector('#edit-saleType');
        let select_type_row = document.getElementById(`edit-saleType-${editID}`);
        if (select_type_row.innerHTML === 'SESSION') {
            for (let tagid of tag_ids) {
                tag = document.querySelector(tagid);
                tag.required = true;
            };

            select_type_tag.selectedIndex = 1;
            let trainer_tag = document.querySelector('#edit-sessionTrainer');
            trainer_tag.disabled = false;
            let trainer_row = document.getElementById(`edit-sessionTrainer-${editID}`);
            for (i in trainer_tag.options) {

                if (trainer_tag.options[i].value === trainer_row.getAttribute('name')) {
                    trainer_tag.selectedIndex = i;

                    let data = {
                        id: trainer_tag.options[i].value
                    };
                    let date_tag = document.querySelector('#edit-sessionDate');
                    // get async data, then use to fill next dropdown
                    getData('sales-get-dates', data)
                        .then((dates) => {
                            fillOptions(date_tag, 'date', dates);
                            enableSelector(date_tag);
                        });

                    break;
                }
            };
        } else {
            select_type_tag.selectedIndex = 2;
        };
    }

    editForm.reset();

    // get all input tags in form
    let input_tags = editForm.getElementsByTagName('input');

    for (let tag of input_tags) {
        // ignore submit tag
        if (tag.type !== "submit" && tag.parentElement.tagName !== 'DIV') {
            // td id is matched with input tag id
            let td;
            if (payForm) {
                td = document.getElementsByClassName(`${tag.id}-${editID}`)[0];
            } else {
                td = document.getElementById(`${tag.id}-${editID}`);
            };

            let value = td.innerHTML;
            if (tag.type === 'date') {
                value = new Date(value).toISOString().slice(0,10);
            } else if (tag.id === 'pay-saleAmount') {
                let balance = document.getElementsByClassName(`pay-balance-${editID}`)[0];
                value = balance.innerHTML;
                tag.max = balance.innerHTML
            };

            tag.setAttribute('value', value);
        };
    };

    if (payForm) {
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        window.scrollTo(0,0);
    };
    
};