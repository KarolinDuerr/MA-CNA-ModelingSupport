# Configure UIModalDialog

1. Create method/ methods with properties
2. Render
3. Configure Save (also possible before render because of "fallback" behaviour)
4. show


## Configuration element

```.mjs
UIModalDialog: {
  type: "modalDialog",
  dialogSize: Dialogsize.LARGE [default: normal --> no value]
  header: {
    iconClass: "fa-solid fa-triangle-exclamation" // [default: fa-solid fa-info],
    svgRepresentation: "<svg>...</svg>" // [alternative to iconClass]
    type: "warning", // [default: normal]
    text: "Headline Text" // [required],
    closeButton: true // [default: false]
  },
  footer: {
    cancelButtonText: "Cancel" // [default: Close],
    saveButtonIconClass: "fa-solid fa-...",
    saveButtonText: "Clear paper" // [if save button desired --> required]
  },
  content: {
    contentType: UIContentType.SINGLE_TEXTBLOCK, // [required]
    text: "...." [required]
  }


  // Alternative content:
  content: {
    contentType: UIContentType.GROUP_FORMS, // [required]
    groups: [
      {
        contentType: PropertyContentType.INFO, // [required]
        headline: "Your headline", // [required]
        text: "Hi this is the test under the headline" // [required]
      },
      {
        contentType: PropertyContentType.TABLE, // [required]
        headline: "Your Table Section", // [required]
        text: "Your text before the table",
        tableColumnHeaders: [ // [required]
          {
            text: "ColumnHeadline 1", // [required]
            colspan: 2
          },
          {
            text: "ColumnHeadline 2", // [required]
          }
        ],
        tableRows: [ // [required]
          {
            columnName: "",
            action: { // [if entry is object --> contentType decides what kind of GUI element is created]
                contentType: PropertyContentType.CHECKBOX_WITHOUT_LABEL, // [required]
                disabled: false, // [default: false]
                checked: false, // [default: false]
                required: false, // [default: false]                
                reaonly: reaonly, // [default: false]
                ....
            },
            attributes: { // [not represented as column but additional row information]
              representationClass: "", // [to provide additional css class]
              disabled: false // [default: false | decides if entire row appears disabled]
            }
          }
        ]
      }
    ]
  }
}
```


# Configure Form Element with DropDown with Options

1. porpertyForm = new FormGroup ()
2. porpertyForm.addDropdownElementWithLabelAndOptions (label, attributes, properties, options)

## Configuration element

```.mjs
FormGroup(Dropdown): {
  label: "LabelText" [required]
  properties: {
    disabled: false, // [default: false]
    required: false, // [default: false]
    checked: false, // [default: false]
    reaonly: reaonly // [default: false]
  },
  attributes: {
    placeholder: "Choose X...", [default: Choose...]
    svgRepresentation: "<svg>...</svg>",
    iconClass: "fa-solid fa-info", // [alternative to svgRepresentation]
    helpText: {
      text: "Your description can go here"
    },
    options: [
      {
        optionValue: "1",
        optionText: "Selection 1"
      },
      {
        optionValue: "myValue",
        optionText: "Selection 2",
        optionTitle: "My tooltip option",
        optionRepresentationclass: "myCssClass",
        disabled: false, // [default: false]
        selected: false [default: false]
      }
    ]
  }
}

```


# Configure Form Element with Button

1. porpertyForm = new FormGroup ()
2. porpertyForm._addButtonElementWithLabel (label, attributes, properties)

## Configuration element

```.mjs
FormGroup(Button): {
  label: "LabelText" [required]
  properties: {
    disabled: false, // [default: false]
    required: false, // [default: false]
    checked: false, // [default: false]
    reaonly: reaonly // [default: false]
  },
  attributes: {
    svgRepresentation: "<svg>...</svg>",
    iconClass: "fa-solid fa-info", // [alternative to svgRepresentation]
    buttonText: "Click me",
    buttonIconClass: "fa-solid fa-plus"
    helpText: {
      text: "Your description can go here"
    }
  }
}

```



# Configure Form Element with Text Input

1. porpertyForm = new FormGroup ()
2. porpertyForm.addTextElementWithLabel(label, attributes, properties)

## Configuration element

```.mjs
FormGroup(Text Input): {
  label: "LabelText" [required]
  properties: {
    disabled: false, // [default: false]
    required: false, // [default: false]
    checked: false, // [default: false]
    reaonly: reaonly // [default: false]
    additionalButton: { // [currently only alternative is editButton]
      disabled: false, // [default: false]
      required: false, // [default: false]
      checked: false, // [default: false]
      reaonly: reaonly // [default: false]
    }
  },
  attributes: {
    svgRepresentation: "<svg>...</svg>",
    iconClass: "fa-solid fa-info", // [alternative to svgRepresentation]
    placeholder: "Your text goes here",
    maxlength: 10,
    value: "Your value goes here",
    pattern: "some regex pattern",
    title: "Your tooltip text goes here",
    provideEditButton: true, // [default: false, if "true" the field has no enter button]
    provideEnterButton: true // [default: true, either edit or enter button]
    helpText: {
      text: "Your description can go here"
    }
  }
}

```
