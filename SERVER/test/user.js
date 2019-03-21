import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { createTable,dropTable } from "../db/tables";

chai.use(chaiHttp);
chai.should();
let token;
let messageId;


describe("API EndPoints V2", () => {
    before(done => {
        dropTable().then(() => {
            createTable().then(() => {
              done();
            });
          });
        });
    it("Should let user to signup", (done) => {
        chai.request(app)
            .post("/api/v2/signup")
            .send({
                email: "kingi@gmail.com",
                password: "123457",
                lastname: "king",
                firstname: "sdfds"
            })
            .end((err, res) => {
                if (err) {
                console.log(err);
                }
                res.should.be.an("object");
                res.should.have.status(201);
                res.body.should.have.property("status");
                res.body.should.have.property("token");
                done();
            })
    })
    //
    it("should return status code of 400",(done)=>{
        chai.request(app)
        .post("/api/v2/signup")
        .send({
            email:"",
            password:"1234567",
            lastname:"dsfsd",
            firstname:"sdfdsfds"
        })
        .end((err, res) => {
            if (err) {
            console.log(err);
            }
            res.should.be.an("object");
            res.should.have.status(400);
            done();
        })
    })
});
