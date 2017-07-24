## ClonComponent Component Documentation

**Calling of ClonComponent Component**

```no-highlight
    <ClonComponent  />
```
**Parameters of ClonComponent Component**

>**ref** *String*
>> It  holds the values of the form. It must be unique throughout the form.

>**formData** *Array*
>> It is an array of input fields with their specific properties.

**Example of ClonComponent**

```no-highlight

  <ClonComponent
    ref="variantForm"
    formData={this.formData()}
  />
```

**Example of formData**
```
[
    {
        "id" : "email",
        "type" : "email",
        "field" : "singleLineText",
        "label" : "Email",
        "isRequired" : true,
        "placeholder":"Please enter Email"
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
