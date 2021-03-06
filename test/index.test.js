/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect

describe('Koop provider', function () {
  it('should export required properties and functions', () => {
    const provider = require('../src/index')

    expect(provider.type).to.equal('provider')
    expect(provider.name).to.equal('koop-provider-socrata')
    expect(provider.Model).to.be.a('function')
  })
})
