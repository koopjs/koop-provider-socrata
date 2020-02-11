/* eslint-env mocha */

/*
  model.test.js

  This file is optional, but is strongly recommended. It tests the `getData` function to ensure its translating
  correctly.
*/
const nock = require('nock')
const chai = require('chai')
const expect = chai.expect

describe('Koop provider - model', function () {
  it('should get a geojson from the getData() function', (done) => {
    const Model = require('../src/model')
    const model = new Model()
    nock('https://test.gov')
      .get('/resource/test-resource.geojson')
      .reply(200, JSON.stringify({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                -72.82920259099967,
                41.61609643000048
              ]
            },
            properties: {
              phone1: '860-620-0194',
              business: 'Karabin Farms',
              location_1_address: '894 Andrews Street',
              website: {
                url: 'http://www.karabinfarms.com'
              },
              zipcode: '06489',
              farmer_id: '7243',
              location_1_city: 'Southington',
              l: '13',
              farm_name: 'Karabin Farms',
              location_1_state: 'CT',
              category: 'Fruit',
              location_1_zip: '06489',
              suite: null,
              item: 'Peaches'
            }
          }
        ],
        crs: {
          type: 'name',
          properties: {
            name: 'urn:ogc:def:crs:OGC:1.3:CRS84'
          }
        }
      }))

    model.getData({ params: { host: 'test.gov', id: 'test-resource' } }, (err, geojson) => {
      expect(err).to.equal(null)

      expect(geojson.type).to.equal('FeatureCollection')
      expect(geojson.metadata.geometryType).to.equal('Point')
      expect(geojson.features).to.be.an('array')
      done()
    })
  })

  it('should handle request error', (done) => {
    const Model = require('../src/model')
    const model = new Model()

    nock('https://test.gov')
      .get('/resource/test-resource.geojson')
      .reply(500)

    model.getData({ params: { host: 'test.gov', id: 'test-resource' } }, (err, geojson) => {
      expect(err).to.be.an('Error')
      expect(geojson).to.equal(undefined)
      done()
    })
  })

  it('should use "Point" as the default geometry type', (done) => {
    const Model = require('../src/model')
    const model = new Model()

    nock('https://test.gov')
      .get('/resource/test-resource.geojson')
      .reply(200, JSON.stringify({
        type: 'FeatureCollection',
        features: []
      }))

    model.getData({ params: { host: 'test.gov', id: 'test-resource' } }, (err, geojson) => {
      expect(err).to.equal(null)
      expect(geojson.metadata.geometryType).to.equal('Point')
      done()
    })
  })
})
