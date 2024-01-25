// code for deleteRow using regular javascript/xhttp
function fillEditForm(editID, payForm=false) {
    // let dataRow = document.getElementById(`${editID}`);
    // let columns = dataRow.getElementsByClassName('data-col');

    // get html collection of input tags in the edit form
    let editForm;
    if (payForm) {
        editForm = document.getElementById('pay-form');
    } else {
        editForm = document.getElementById('edit-form');
    }

    editForm.reset();

    // fill select form elements
    let select_tags = editForm.getElementsByTagName('select');
    for (let tag of select_tags) {
        if (tag.multiple) {
            // multiselect form options are in class='multiselect-editID' in table
            let td_array = document.getElementsByClassName(`multiselect-${editID}`);
            
            // match values from td_array to multiselect form element and fill

            // first clear options
            for (option of tag.children) {
                option.selected = false;
            };

            // fill options with new selections
            for (td of td_array) {
                for (option of tag.children) {
                    if (`${td.getAttribute('value')}` === `${option.value}`) {
                        option.selected = true;
                        break;
                    };
                };
            };

        } else {
            let td = document.getElementById(`select-${editID}`)
            for (option of tag.children) {
                if (`${td.getAttribute('value')}` === `${option.value}`) {
                    option.setAttribute('selected', true);
                    break;
                }
            }
        };
    };

    // get all input tags in form
    let input_tags = editForm.getElementsByTagName('input');

    for (let tag of input_tags) {
        // ignore submit tag
        if (tag.type !== "submit") {
            // td id is matched with input tag id
            let td = document.getElementById(`${tag.id}-${editID}`);
            let value = td.innerHTML;
            if (tag.type === 'date') {
                value = new Date(value).toISOString().slice(0,10);
            }
            tag.setAttribute('value', value);
        };
    };

    window.scrollTo(0,0);
  };