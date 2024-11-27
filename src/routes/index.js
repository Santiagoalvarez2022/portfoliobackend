const { Router } = require('express')
const routerUser = require('./routerUser')
const routerProject = require('./routerProject')
const routerComment = require('./routerComment')
const routerCategory = require('./routerCategory')
const routerCountry = require('./routerCountry')
const routerImage = require('./routerImage')
const routerCheckout = require('./routerCheckout')
const routerChat = require('./routerChat')
const routerReputation = require('./routerReputarion')
const routerStats = require('./routerStats')
const index_Router_Dogs = require('./routesDogs/index')
const index_Router_Temperaments = require('./routesTemperaments/index') 


const mainRouter = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//añadir rua como /apidogs
mainRouter.use("/dogs",index_Router_Dogs )
mainRouter.use("/temperaments",index_Router_Temperaments )

mainRouter.use('/user', routerUser)
mainRouter.use('/project', routerProject)
mainRouter.use('/comment', routerComment)
mainRouter.use('/category', routerCategory)
mainRouter.use('/country', routerCountry)
mainRouter.use('/images', routerImage)
mainRouter.use('/checkout', routerCheckout)
mainRouter.use("/chats", routerChat)
mainRouter.use("/reputation", routerReputation)
mainRouter.use('/stats', routerStats)

module.exports = mainRouter