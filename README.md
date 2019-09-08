# Transactions module

This a micro-service to handle fraudlent transactions by flagging them either active or blocked.

## Techincal Stack
 - NodeJS with express as web application framework for the backend server
 - Lokijs as in-memory database
 - Webpack and Webpack dev server for the front-end renderning
 - ReactJS with materializeCSS for the front end UI

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

Scripts to start the server : `npm run dev`

## API

`/api/getalltranscation` : To get all the transactions irrespective wheather they have been proccessed or not

`getunprocessedtranscation` : Fetches all the transcations which has not been proccessed

`/api/updatetransaction` : POST call to update transactions . Takes two parameters `status` and `transactionID`. Used single API to activate or block transactions . This makes it easier to maintain

## In memory Database

Used lokijs which acts as in-memory no-sql DB. Have added 5 documents during the startup of the server.

### Notes:

- Have tried to keep the components as independent as possible. This has been done to give a space for code enhancement and also to add new feature easily. 

- Have not complicated things by using lot of technologies . Any new technology will have a new dependency to maintain. The entire task could be finished without adding any fancy new stuffs


