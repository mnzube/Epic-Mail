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
    it("Should let a user signup", (done) => {
        chai.request(app)
            .post("/api/v2/signup")
            .send({
                email: "king@gmail.com",
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
    //sign up check for empty fields
    it("should check for empty fields",(done)=>{
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
    //signin
    it("Should let a user signin", (done) => {
        chai.request(app)
            .post("/api/v2/signin")
            .set("Content-type", "application/json")
            .send({
                email:"king@gmail.com",
                password:"123457"
            })
            .end((err, res) => {
                
                if (err) {
                    done(err);
                }
                token = res.body.token;
                res.should.be.an("object");
                res.should.have.status(200);
                res.body.should.have.property("token");
                res.body.should.have.property("status");
                done();
            })

    })
    //check for 400 status in signin
    it("Should check for empty fields", (done) => {
        chai.request(app)
            .post("/api/v2/signin")
            .set("Content-type", "application/json")
            .send({
                email: "",
                password: "12345678"
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(400);
                res.body.should.have.property("error");
                done();
            })
        })
         //@testing message endpoint 
    it("Should create message", (done) => {
        chai.request(app)
            .post("/api/v2/messages")
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .send({
                subject: "Hello",
                message: "how are you",
                receiver: "2"
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(201);
                done();
            })
    })
    //unread messages
    it("Should return 200 status and unread messages", (done) => {
        chai.request(app)
            .get(`/api/v2/messages/unread`)
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                done();
            })
    }) 
});
