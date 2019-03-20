import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
chai.use(chaiHttp);
chai.should();
let token;
let messageId;
describe("API EndPoints V2", () => {
    it("Should let user to signup", (done) => {
        chai.request(app)
            .post("/api/v2/signup")
            .send({
                email: "kigali12@gmail.com",
                password: "12345678",
                lastname: "dsfsd",
                firstname: "sdfdsfds"
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(201);
                res.body.should.have.property("status");
                res.body.should.have.property("token");
                done();
            })
    })
});
