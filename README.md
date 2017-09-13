# crudpluginModified


Rather than taking a mongodb collection as target, CRUD will take a mongoose model plus the JSON payload and will execute the desired action i.e. C, R, U or D...

This will free other services which leverage CRUD to define their data models and route handlers which will internally leverage CRUD functionality.

In summary,  this plugging will be the main source or entry point of all CRUD requests?


A good example is USER... this defines 'user' data model with various fields to differntiate between the various types of users (normal, admin, superuser) ..., Take note that USER would also handle the dbase connection.

So USER leverages CRUD by 'importing' it via NPM.

Next it passes the dbase connection and required model into the CRUD 'constructor'..
Then the route handlers would intercept the requests and call the functionality exposed by CRUD


[8:31] 
Does this make sense?