## CustomForm Component Documentation

**CustomForm**
> Custom form is a utility for building powerful forms quickly and easily.

**Calling of CustomForm Component**

```no-highlight
    <CustomForm  />
```

**Props of CustomForm Component**

>**formData** *Array*
>> It is an array of input fields with their specific properties.

>**formValues** *Object*
>> It is an Object of default values of the fields specified in the formData.

>**ref** *String*
>> It  holds the current state of the form. It must be unique throughout the form.



**Example of CustomForm**

```no-highlight
    <CustomForm
        formData={formData}
        formValues={formValues}
        ref="formName"
      />
```

**Example of formData**
```
[
    {
      "id"         : "url",
      "type"       : "image",
      "field"      : "fileUpload",
      "label"      : "Image",
      "isRequired" : false
    }
]
```

**Fields in formData**
>**id** *Required*
>> Refrence for field of componentDidMount.

>**type**
>> It specifies the value type of form.

>>**Accepted values** Image, text, number.

>**field**
>>It specifies the type of form.

>>**Accepted values** singleLineText, fileUpload, paragraphText,multipleCheckbox, multipleChoice, checkbox, dropdown, multiSelectDropdown.

>**label**
>>It specifies the label of component.

>**isRequired** *Boolean*
>It specifies the field is mandatory.

>**placeholder**
>It specifies a short hint that describes the expected value of an input field

**Create multiple fields in single form**
>Create array of JSON separated by comma
```
[
      {
        "id"         : "price",
        "type"       : "number",
        "field"      : "singleLineText",
        "label"      : "Price",
        "placeholder": "Price"
      },
      {
        "id"         : "url",
        "type"       : "image",
        "field"      : "fileUpload",
        "label"      : "Image",
        "isRequired" : false
      },
      {
        "id"         : "description",
        "field"      : "paragraphText",
        "label"      : "Description",
        "placeholder": "Description",
        "isRequired" : true
      },
      {
        "id"         : "mcheckbox",
        "field"      : "multipleCheckbox",
        "label"      : "",
        "isRequired" : false,
        "isSelected" : false,
        "choices"    : [
            {
              "isChecked" : false,
              "value"     : "Multi Checkbox"
            }
        ]
      },
      {
        "id"            : "dropdown",
        "field"         : "dropdown",
        "label"         : "DropDown",
        "choices"       : [
              { key:'help', value:"helper" }
        ],
        "defaultOption" : "This is a dropdown",
        "isRequired"    : false
      },
      {
        "id"         : "day",
        "field"      : "multiSelectDropdown",
        "label"      : "Day Time",
        "isRequired" : true,
        "choices"    : [
            { key:'DAY', value:'DAY' },
            { key:'NIGHT', value:'NIGHT' }
          ]
      },
      {
       "id"         : "multipleChoice",
       "field"      : "multipleChoice",
       "label"      : "Multiple Choice",
       "isRequired" : true,
       "choices"    : [
            { key:'DAY', value:'DAY' },
            { key:'NIGHT', value:'NIGHT' }
          ]
      }
  ]
  ```
