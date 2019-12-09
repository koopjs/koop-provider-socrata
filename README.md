# koop-provider-socrata

A minimal Koop 3.x provider for connecting to Socrata data sources.

### Accessing Socrata data
Use the Koop `host` and `id` parameter to dynamically point your provider to a Socrata resource.  
For example, to access the data at [https://data.ct.gov/resource/y6p2-px98.json](https://data.ct.gov/resource/y6p2-px98.json) you would use a `host` value of `data.ct.gov` and an `id` value of `y6p2-px98`. This would translate to the following Koop FeatureServer endpoint:  

[http://localhost:8080/koop-provider-socrata/data.ct.gov/y6p2-px98/FeatureServer/0/query](http://localhost:8080/koop-provider-socrata/data.ct.gov/y6p2-px98/FeatureServer/0/query)

### Testing

This project uses [mocha](https://www.npmjs.com/package/mocha) as the testing framework and [chaijs](https://www.chaijs.com/) as the assertion library. All test files in the `test` directory should have the special extension `.test.js`, which will be executed by the command:

```
$ npm test
```

### Dev Server

This project by default uses the [Koop CLI](https://github.com/koopjs/koop-cli) to set up the dev server. It can be invoded via

```
$ npm start
```

The server will be running at `http://localhost:8080` or at the port specified at the configuration.

Check your instance with this test endpoint:
[http://localhost:8080/koop-provider-socrata/data.ct.gov/y6p2-px98/FeatureServer/0/query](http://localhost:8080/koop-provider-socrata/data.ct.gov/y6p2-px98/FeatureServer/0/query)
