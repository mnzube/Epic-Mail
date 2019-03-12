import chai from 'chai';
import chai_http from 'chai-http';
import { expect} from 'chai';
import {should} from 'chai';
import app from './SERVER/routes/authRoutes';
chai.use(chai_http);


describe('Testing Epic Mail API', () => {
    it('test root directory', (done) => {
        chai.request(app)
        .post('/signup')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.a("");
            done();
        })
    })
})