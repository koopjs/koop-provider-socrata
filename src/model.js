const _ = require('lodash')
const fetch = require('node-fetch')

/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: https://koopjs.github.io/docs/usage/provider
*/

function Model (koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
// req.
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method
Model.prototype.getData = function (req, callback) {
  const { host, id } = req.params

  // 1. Construct the Socrata API request URL
  const url = `https://${host}/resource/${id}.geojson`

  try {
    // 2. Make the request to the remote API
    fetch(url).then(resp => {
      if (!resp.ok) throw new Error(`Request to ${url} failed; ${status}, ${statusText}.`)
      return resp.json()
    }).then(geojson => {

      // 4. Create Metadata
      const geometryType = _.get(geojson, 'features[0].geometry.type' || 'Point')
      geojson.metadata = { geometryType }

      // 5. Fire callback
      callback(null, geojson)
    })


  } catch (err) {
    // 6. Handle any errors
    callback(err, null)
  }

  const geojson = {
    type: 'FeatureCollection',
    features: []
  }
}

module.exports = Model
