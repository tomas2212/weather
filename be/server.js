// const _ = require('lodash')
const config = require('config')
const express = require('express')
// const path = require('path')
// const busboy = require('connect-busboy')

const connectDB = require('./src/db/dbconfig')
const Routes = require('./src/api/routes')
const expressSwaggerGenerator = require('express-swagger-generator')

// const REACT_APP_PROD_BUILD = '../client/build'

connectDB()
const app = express()

// const UPLOAD_FILE_SIZE_PROP = 'uploadFileSize'

// file uploads
// app.use(
//     busboy({
//         limits: {
//             files: 1,
//             fileSize: !config.has(UPLOAD_FILE_SIZE_PROP) ? 10 * 1024 * 1024 : config.get(UPLOAD_FILE_SIZE_PROP)
//         }
//     })
// )

// Init Middleware for parsing JSON body
app.use(express.json({ extended: false }))

// app.set('etag', false)

const PORT = process.env.PORT || 5000
// const isProduction = () => {
//     const environment = process.env.NODE_ENV || ''
//     return _.trim(environment) === 'production'
// }

// if (!isProduction()) {
expressSwaggerGenerator(app)({
  swaggerDefinition: {
    info: {
      description: 'Weather backend server',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: `localhost:${PORT}`,
    basePath: '/',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./src/api/routes/**/*.js'] //Path to the API handle folder
})
// }

// Register all exported routes
Object.keys(Routes).forEach((path) => app.use(path, Routes[path]))

app.get('/api/test', (req, res) => res.send('API is running'))

// if (isProduction()) {
//     // Serve the static files from the React app
//     app.use(express.static(path.join(__dirname, REACT_APP_PROD_BUILD)))

//     // Handle any requests that don't match the ones above
//     // TODO - exclude *.js.map files to prevent showing JS code in production
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname + `/${REACT_APP_PROD_BUILD}/index.html`))
//     })
// }

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
