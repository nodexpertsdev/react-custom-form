# react-custom-form
Package to create react form by using json data

## Quick examples:

**Usage of CustomForm component**

```no-highlight
  <CustomForm
    formData={formData}
    formValues={formValues}
    ref="formName"
  />
```

**Usage of formData**
```
[
  {
    "id"         : "price",
    "type"       : "number",
    "field"      : "singleLineText",
    "label"      : "Price",
    "placeholder": "Price"
  },
]
```

**Usage of formValue**
```
[
  {
    "price"      : 100
  },
]
```

## To install package

`meteor add nodexpert:react-custom-form`


Docs
-----

* [Custom Form](docs/form/README.md)

* [Checkbox](docs/checkbox/README.md)
* [File](docs/file/README.md)
* [Multi-Select](docs/multiSelect/README.md)
* [Radio](docs/radio/README.md)
* [Text](docs/text/README.md)
* [Textarea](docs/textarea/README.md)


To Do
-----

`Unit tests`
