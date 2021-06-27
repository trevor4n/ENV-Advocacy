// const wrap = document.querySelector('.wrap')
//var nav = M.Sidenav.getInstance(document)
var hamburgerMenu = document.getElementsByClassName('.sidenav-trigger')

// var flag = 'blank'

function genFilters(){
    // compile an array (key value pairs) of tags from Snippet
    // remove duplicates
    // for each tag create an li
    // give each tag a checkbox (defaulted to unchecked)
    // checking tabs should enable their value
    // call another helper function to selectSnippet using the array as a reference from the Snippet model
}

function getStarted(){
    // if(document.readyState !== 'loading'){ //still loading
        // wait
        // flag = 'green'
        // console.log('here')
        document.addEventListener('DOMContentLoaded', function() {
            console.log('dom loaded')
            var elems = document.querySelectorAll('.sidenav');
            //var instances = M.Sidenav.init(elems, options);
            var instances = M.Sidenav.init(elems)
        
            // todo - is the below already taken care of by sidenav-close li tag?
            // if(nav.isOpen)
            //     nav.close()
            // else
            //     nav.open()
            //let hamburgerMenu = document.getElementsByClassName('.sidenav-trigger')
            hamburgerMenu.addEventListener('click', () => {
                // console.log('e ' + e)
                hamburgerMenu.sidenav()
            })
        }) 
    // }
}

setTimeout(getStarted(), 5000)
//getStarted() //kms

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

// stretch - Using MDC Web with Sass and ES2015 https://material.io/develop/web/getting-started