// var nav = M.Sidenav.getInstance(document)
// var hamburgerMenu = document.querySelector('.sidenav-trigger')
// var hamburgerMenu = null

// if(document.readyState !== 'loading'){ //still loading
    document.addEventListener('DOMContentLoaded', function() {
        console.log(`🌟 DOM loaded ✅`)

        M.AutoInit() // ref - https://materializecss.com/auto-init.html

        var elem = document.querySelector('.sidenav')
        //var instances = M.Sidenav.init(elems, options)
        // var instance = M.Sidenav.init(elem, {})
        var inst = M.Sidenav.getInstance(elem)
        // hamburgerMenu = instance
        //console.log(instance)

        /*
        elem.addEventListener('click', () => { // todo - ready?
            // hamburgerMenu.sidenav()
            // instance.sidenav()
            console.log('isOpen', inst.isOpen)
            if(!inst.isOpen()){
                inst.open()
            }
            else{
                inst.close()
            }
        })
        */
        var closeSidenav = document.querySelector('.sidenav-close')
        var closeSidenavInstance = M.Sidenav.getInstance(closeSidenav)

        /*
        closeSidenavInstance.addEventListener('click', () => {
            if(inst.isOpen())
                inst.close()
        })
        */
    }) 
// }

// setTimeout(getStarted(), 1)