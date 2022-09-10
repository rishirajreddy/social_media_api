const request = require('supertest');
const { response } = require('./index');
const app = require("./index");

let token;

beforeAll((done) => {
    request(app)
        .post('/api/authenticate')
        .send({
            email: "msd@gmail.com",
            password:"1234567"
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
})

describe('POST /authenticate', () => {
    describe('given a username and password', () => { 
        test('should contain token', async() => { 
            const response = await request(app).post('/api/authenticate').send({
                email: "msd@gmail.com",
                password:"1234567"
            })
            expect(response.body.token).toBeDefined();
        })
    }) 
})

describe('GET getting all posts', () => {
    describe('given email and password with the following id', () => {
        test('should response with all posts', async() => {
            return request(app).get('/api/all_posts')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response.body.posts).toBeDefined();
            })
        })
    })
})

describe('GET respective user details', () => { 
    test('should response with user details', async() => { 
        return request(app).get('/api/user')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
            console.log(response.body.details);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined()
        }) 
    }) 
})

describe('PATCH follow/unfollow user', () => {
    test('should follow user messi@gmail.com', async() => { 
        return request(app).patch('/api/follow/631aea2e3226e577c6e18f50')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
            // console.log(response.body.msg);
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({msg: "Following messi@gmail.com success"})
        }) 
    })

    test('should unfollow user messi@gmail.com', async() => { 
        return request(app).patch('/api/unfollow/631aea2e3226e577c6e18f50')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({msg: 'Unfollowed messi@gmail.com'})
        }) 
    })
})

describe('PATCH posts controllers', () => { 
    // test('should create a post', async() => { 
    //     return await request(app).patch('/api/posts')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({
    //         title: "Nice",
    //         desc: "My Another post"
    //     })
    //     .then((response) => {
    //         expect(response.statusCode).toBe(200);
    //         expect(response.body).toStrictEqual({msg:"Post Created"})   
    //     })
    // })
    
    // test('should delete a post', async() => { 
    //     return await request(app).delete('/posts/631c30e1a598c90aed1d59b4')
    //     .set('Authorization', `Bearer ${token}`)
    //     .then((response) => {
    //         expect(response.statusCode).toBe(200);
    //         expect(response.body).toStrictEqual({msg:"Post Deleted"})   
    //     })
    //  })

    test('should return title is missing', () => { 
        return request(app).patch('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
            desc: "Hala Madrid"
        })
        .then((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({msg:"Title is required"});
        }) 
    })

    test('should like a post', async() => { 
        return  request(app).post('/api/like/631aeaaa3226e577c6e18f60')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
        })
     })

    test('should add a comment to the post', async() => { 
        return  request(app).post('/api/like/631aeaaa3226e577c6e18f60')
        .set('Authorization', `Bearer ${token}`)
        .send({
            comment: "Wow nic one"
        })
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
        })
     })

    test('should return a particular post', async() => { 
        return  request(app).post('/api/like/631aeaaa3226e577c6e18f60')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
        })
     })

})

