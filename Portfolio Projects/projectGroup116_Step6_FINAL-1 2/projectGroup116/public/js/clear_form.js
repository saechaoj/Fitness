function clearForm(formID) {
    // console.log('clearing form...')
    let form = document.getElementById(formID);
    form.reset()
    // console.log('form cleared')
};

function clearFormElements(form) {
    let select_tags = form.getElementsByTagName('select');
    for (tag of select_tags) {
        if (tag.multiple) {
            for (option in tag.selectedOptions) {
                // unselect each option
                option.selected = false;
            }
        } else {
            // reset drop-down to first menu item
            tag.options[0].selected = true;
        }
    }
    
    let input_tags = form.getElementsByTagName('input');
    for (tag of select_tags) {
        tag.value = ""
    }
};