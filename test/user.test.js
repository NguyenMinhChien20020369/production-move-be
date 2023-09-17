let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
const { authJwt, validateData } = require("../middlewares");
const controller = require("../controllers/user.controller");

server.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

process.env.NODE_ENV = 'test';

let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET users', () => {
        it('it should GET all the directory product', (done) => {
            chai.request(server)
                .get(
                    "/api/moderator/directory/product",
                    [authJwt.verifyToken, authJwt.isModerator],
                    controller.ModeratorDirectoryProduct
                )
                .set({ "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk0OTQwMzQ1LCJleHAiOjE2OTUwMjY3NDV9.H2sKJSNdHIVPo-_0VaSOInj-n-m9MFbUqdeE1PVhnZo" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
    });
});