// const wrap = document.querySelector('.wrap')
//var nav = M.Sidenav.getInstance(document)
// var hamburgerMenu = document.querySelector('.sidenav-trigger')
var hamburgerMenu = null

// var flag = 'blank'

// function genFilters(){
//     // compile an array (key value pairs) of tags from Snippet
//     // remove duplicates
//     // for each tag create an li
//     // give each tag a checkbox (defaulted to unchecked)
//     // checking tabs should enable their value
//     // call another helper function to selectSnippet using the array as a reference from the Snippet model
// }

function getStarted(){
    // if(document.readyState !== 'loading'){ //still loading
        // flag = 'green'
        document.addEventListener('DOMContentLoaded', function() {
            //console.log('dom loaded')
            hamburgerMenu = document.querySelector('.sidenav-trigger');
            //var instances = M.Sidenav.init(elems, options);
            let instance = M.Sidenav.init(hamburgerMenu)

            // elem.addEventListener('click', () => {
            hamburgerMenu.addEventListener('click', () => {
                // console.log('e ' + e)
                instance.sidenav()
            })
        }) 
    // }
}

setTimeout(getStarted(), 3000)