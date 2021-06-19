const mdc = require('material-components-web')
import {MDCChipSet} from '@material/chips';
const chipSetEl = document.querySelector('.mdc-chip-set');
const chipSet = new MDCChipSet(chipSetEl);

const wrap = document.querySelector('.wrap')

function genFilters(){
    // compile an array (key value pairs) of tags from Snippet

    // remove duplicates
    // for each tag create an li
    // give each tag a checkbox (defaulted to unchecked)
    // checking tabs should enable their value
    // call another helper function to selectSnippet using the array as a reference from the Snippet model

}

//genFilters()

mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'))

// stretch - Using MDC Web with Sass and ES2015 https://material.io/develop/web/getting-started