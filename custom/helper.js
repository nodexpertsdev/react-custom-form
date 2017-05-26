const helpers = {};

helpers.modifyValues = function(formData, formValues) {
	_.map(formData, function(element) {
        const { id, field } = element;
        if(!(formValues && formValues[id])) {
            return;
        }

        if(field == "checkbox") {
            let temp = [{
                value     : element.choice,
                isChecked : true
            }];
            formValues[id] = temp;
        }

        if(field == "multipleCheckbox") {
            let values = formValues[id];
            let choices= element.choices;
            _.map(choices, function(item, key) {
                item.isChecked = false;
                if(values.indexOf(item.value) != -1) {
                    item.isChecked = true;
                }
                return item;
            });
            formValues[id] = choices;
        }

        if(field == "multipleChoice") {
            let values = formValues[id];
            let choices= element.choices;
            _.map(choices, function(item, key) {
                item.isDefault = false;
                if(values == item.value) {
                    item.isDefault = true;
                }
                return item;
            });
            formValues[id] = choices;
        }
    });
    return formValues;
}

export default helpers;
