import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import messageRoutes from "../routes/messageRoute";
import authRoutes from "../routes/authRoutes";
import bodyParser from "body-parser";
import uuid from "uuid";

chai.use(chaiHttp);
const { should } = chai.should();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//@router configuration
app.use("/api/v1", authRoutes);
app.use("/api/v1", messageRoutes);
let token;
let messageId;


describe("API EndPoints", () => {
    it("Should let user to signup", (done) => {
        chai.request(app)
            .post("/api/v1/signup")
            .send({
                email: "mnzube@gmail.com",
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
                res.body.should.have.property("message");
                res.body.should.have.property("status");
                done();
            })
    })
    //404 error message test
    it("Should return status of 400", (done) => {
        chai.request(app)
            .post("/api/v1/signup")
            .set("Content-type", "application/json")
            .send({
                email: "",
                password: "",
                lastname: "dsfsd",
                firstname: "sdfdsfds"
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.have.status(400);
                res.should.be.an("object");
                res.body.should.have.property("error");
                done();
            })
    })
    //@signin
    it("Should let user to signin", (done) => {
        chai.request(app)
            .post("/api/v1/signin")
            .set("Content-type", "application/json")
            .send({
                email: "mnzube@gmail.com",
                password: "12345678"
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                token = res.body.token;
                res.should.be.an("object");
                res.should.have.status(200);
                res.body.should.have.property("token");
                res.body.should.have.property("user");
                done();
            })
    })
    //@ check for 400 status in signin
    it("Should return 400 status /api/v1/signin", (done) => {
        chai.request(app)
            .post("/api/v1/signin")
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
            .post("/api/v1/messages")
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .send({
                subject: "Hello",
                message: "how are you",
                parentMessageId: uuid.v4()
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(201);
                messageId = res.body.id;
                done();
            })
    })
    //@400 status message posting
    it("should return a 400 status when creating a message", (done) => {
        chai.request(app)
            .post("/api/v1/messages")
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .send({
                subject: "",
                message: "how are you",
                parentMessageId: uuid.v4()
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(400);
                done();
            })
    })
    //@get all messages
    it("Should get all messages ", (done) => {
        chai.request(app)
            .get("/api/v1/messages")
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(200);
                done();
            })
    })
    // //@get single message
    it("Should get a single message ", (done) => {
        chai.request(app)
            .get(`/api/v1/messages/${messageId}`)
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(200);
                done();
            })
    })
    //@when message id is not available
    it("Should get single message ", (done) => {
        chai.request(app)
            .get(`/api/v1/messages/324326754327473`)
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(404);
                done();
            })
    })
    //@unread messages
    it("Should return 200 status and unread messages", (done) => {
        chai.request(app)
            .get(`/api/v1/messages/v/unread`)
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(200);
                done();
            })
    })
    //@deleting a message
    it("Should return 204 status and delete messages", (done) => {
        chai.request(app)
            .delete(`/api/v1/messages/${messageId}`)
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(204);
                done();
            })
    })
    //@sent messages
    it("Should return 200 status and sent messages", (done) => {
        chai.request(app)
            .get(`/api/v1/messages/v/sent`)
            .set("Content-type", "application/json")
            .set("Authorization", token)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.be.an("object");
                res.should.have.status(200);
                done();
            })
    })
})

