const { expect } = require('chai')
require('dotenv').config();
const port = process.env.PORT || 8080;

describe('Test spec for ascii img transport', () => {
  let server;
  beforeEach((done) => {
    server = app.listen(port, done);
  });

  afterEach(() => {
    server.close();
  });
  xdescribe('Test for encoder', () => {
    it('', () => {
    });
  });
  xdescribe('Test for decoder', () => {
    it('should get a 200 response for GET request', (done) => {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });
});