// I SPENT SO MUCH TIME ON THIS :'(
    // I'm guessing the errors are coming from the async nature of the event listners

// Reference for event listner on select tags
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

// -----------------------------------------------------------------
// select tags
// -----------------------------------------------------------------

const edit_sale_type = document.querySelector('#edit-saleType');
const edit_select_trainer = document.querySelector('#edit-sessionTrainer');
const edit_select_date = document.querySelector('#edit-sessionDate');
const edit_select_time = document.querySelector('#edit-sessionTime');
const edit_select_client = document.querySelector('#edit-sessionClient');

const select_type = document.querySelector('#add-saleType')
const select_trainer = document.querySelector('#add-sessionTrainer');
const select_date = document.querySelector('#add-sessionDate');
const select_time = document.querySelector('#add-sessionTime');
const select_client = document.querySelector('#add-sessionClient');

const pay_sale_type = document.querySelector('#pay-saleType');
const pay_card_number = document.getElementById('pay-cardNumber');
const pay_card_exp = document.getElementById('pay-cardExpiration');
const pay_card_cvv = document.getElementById('pay-cardCVV');
const pay_card_clients = document.getElementById('pay-sessionClient');

// -----------------------------------------------------------------
// event listners for Sales add form select tags
// -----------------------------------------------------------------

// Enable select trainer if select Sale type is "SESSIONS"
select_type.addEventListener('change', (e) => {
    if (select_type.selectedIndex === 1) {
        enableSelector(select_trainer);
        disableSelector(select_date);
        disableSelector(select_time);
        disableSelector(select_client);
    } else {
        disableSelector(select_trainer);
        disableSelector(select_date);
        disableSelector(select_time);
        disableSelector(select_client);
    };
});


// Enable select date if Trainer selected
select_trainer.addEventListener('change', (e) => {
    if (select_trainer.selectedIndex !== 0) {
        let data = {
            id: select_trainer.selectedOptions[0].value
        };
        
        // get async data, then use to fill next dropdown
        getData('sales-get-dates', data)
            .then((trainer_dates) => {
                fillOptions(select_date, 'date', trainer_dates);
                enableSelector(select_date);
                disableSelector(select_time);
                disableSelector(select_client);
            });
        
    } else {
        disableSelector(select_date);
        disableSelector(select_time);
        disableSelector(select_client);
    };
});

// Enable select start time if Session Date selected
    select_date.addEventListener('change', (e) => {
        if (select_date.selectedIndex !== 0) {
            let data = {
                id: select_trainer.selectedOptions[0].value,
                date: select_date.selectedOptions[0].value
            };
            
            // get async data, then use to fill next dropdown
            getData('sales-get-times', data)
                .then((trainer_date_times) => {
                    fillOptions(select_time, 'time', trainer_date_times);
                    enableSelector(select_time);
                    disableSelector(select_client);
                });
        } else {
            disableSelector(select_time);
            disableSelector(select_client);
        };
    });

// Enable select Client if Session start Time selected
select_time.addEventListener('change', (e) => {
    if (select_trainer.selectedIndex !== 0) {
        let data = {
            id: select_trainer.selectedOptions[0].value,
            date: select_date.selectedOptions[0].value,
            time: select_time.selectedOptions[0].value
        };
        
        // get async data, then use to fill next dropdown
        getData('sales-get-clients', data)
            .then((clients) => {
                fillOptions(select_client, 'clients', clients);
                enableSelector(select_client);
            });
    } else {
        disableSelector(select_client);
    };
});

// -----------------------------------------------------------------
// event listners for Sales edit form select tags
// -----------------------------------------------------------------

// Enable select trainer if select Sale type is "SESSIONS"
edit_sale_type = document.querySelector('#edit-saleType');
edit_sale_type.addEventListener('change', (e) => {
    if (edit_sale_type.selectedIndex === 1) {
        enableSelector(edit_select_trainer);
        disableSelector(edit_select_date);
        disableSelector(edit_select_time);
        disableSelector(edit_select_client);
    } else {
        disableSelector(edit_select_trainer);
        disableSelector(edit_select_date);
        disableSelector(edit_select_time);
        disableSelector(edit_select_client);
    };
});


// Enable select date if Trainer selected
edit_select_trainer.addEventListener('change', (e) => {
    if (edit_select_trainer.selectedIndex !== 0) {
        let data = {
            id: edit_select_trainer.selectedOptions[0].value
        };
        
        // get async data, then use to fill next dropdown
        getData('sales-get-dates', data)
            .then((trainer_dates) => {
                fillOptions(edit_select_date, 'date', trainer_dates);
                enableSelector(edit_select_date);
                disableSelector(edit_select_time);
                disableSelector(edit_select_client);
            });
        
    } else {
        disableSelector(edit_select_date);
        disableSelector(edit_select_time);
        disableSelector(edit_select_client);
    };
});

// Enable select start time if Session Date selected
    edit_select_date.addEventListener('change', (e) => {
        if (edit_select_date.selectedIndex !== 0) {
            let data = {
                id: edit_select_trainer.selectedOptions[0].value,
                date: edit_select_date.selectedOptions[0].value
            };
            
            // get async data, then use to fill next dropdown
            getData('sales-get-times', data)
                .then((trainer_date_times) => {
                    fillOptions(edit_select_time, 'time', trainer_date_times);
                    enableSelector(edit_select_time);
                    disableSelector(edit_select_client);
                });
        } else {
            disableSelector(edit_select_time);
            disableSelector(edit_select_client);
        };
    });

// Enable select Client if Session start Time selected
edit_select_time.addEventListener('change', (e) => {
    if (edit_select_trainer.selectedIndex !== 0) {
        let data = {};
        
        // get async data, then use to fill next dropdown
        getData('sales-get-all-clients', data)
            .then((clients) => {
                fillOptions(edit_select_client, 'clients', clients);
                enableSelector(edit_select_client);
            });
    } else {
        disableSelector(edit_select_client);
    };
});

// Enable card info if card type selected for payment
pay_sale_type = document.querySelector('#pay-saleType');
pay_sale_type.addEventListener('change', (e) => {
    let d = document.getElementById('card-info');
    if (pay_sale_type.selectedIndex !== '0' && pay_sale_type.selectedIndex !== '1') {
        enableSelector(pay_card_number)
        enableSelector(pay_card_exp)
        enableSelector(pay_card_cvv)
        d.setAttribute('style', '{display: block}')
    } else {
        d.setAttribute('style', '{display: none}')
        disableSelector(pay_card_number)
        disableSelector(pay_card_exp)
        disableSelector(pay_card_cvv)
    }
});

// -----------------------------------------------------------------
// functions
// -----------------------------------------------------------------
function enableSelector(selector) {
    selector.disabled = false;
    selector.required = true;
};

function disableSelector(selector) {
    selector.selectedIndex = 0;
    selector.disabled = true;
    selector.required = false;
};

// get query data for filling in selector

function getData(path, query_data) {
    return new Promise((resolve, reject) => {
    // setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `/${path}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    xhttp.send(JSON.stringify(query_data));

    
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
})};

// fill given select tag with options from parsed data
function fillOptions(selector, selectorType, data) {
    // clear current options
    while (selector.options.length > 1) {
        selector.options[selector.options.length - 1].remove();
    };

    let date;
    let option_tag;
    for (d of data) {
        option_tag = document.createElement('option');

        if (selectorType === 'date') {
            date = new Date(d.sessionDate);
            option_tag.value = d.sessionDate;
            option_tag.innerHTML = date.toLocaleDateString();
            selector.appendChild(option_tag);
        } else if (selectorType === 'time') {
            option_tag.value = d.startTime;
            option_tag.innerHTML = d.startTime;
            selector.appendChild(option_tag);
        } else if (selectorType === 'clients') {
            option_tag.value = d.clientID;
            option_tag.innerHTML = d.Client;
            selector.appendChild(option_tag);
        };
    };
};