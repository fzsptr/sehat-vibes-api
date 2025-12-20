import supertest from "supertest"
import { web } from "../application/web"
import { UserTest } from "./test-util"
import { logger } from "../application/logging"

// describe('POST /auth/register', () => {

//     afterEach(async () => {
//         await UserTest.delete()
//     })

//     it('should be able register', async() => {
//         const response = await supertest(web)

//             .post("/auth/register")
//             .send({
//                 username: "test",
//                 name: "test",
//                 password: "rahasia",
//                 weight: 60
//             })
        
//         logger.debug(response.body)
//         expect(response.status).toBe(200)
//         expect(response.body.data.username).toBe("test")
//         expect(response.body.data.name).toBe("test")
//         expect(response.body.data.weight).toBe(60)    
//     })

//     it('should reject register if request invalid', async() => {
//         const response = await supertest(web)

//             .post("/auth/register")
//             .send({
//                 username: "",
//                 name: "",
//                 password: "test",
//                 weight: 10
//             })
        
//         logger.debug(response.body)
//         expect(response.status).toBe(400)
//         expect(response.body.status).toBe("error")
//         expect(response.body.errors).toBeDefined()
//     })
// })

// describe('POST /auth/login', () => {

//     beforeEach( async () => 
//         await UserTest.create()
//     )

//     afterEach( async () => {
//         await UserTest.delete()
//     })

//     it('should be able login', async() => {
//         const response = await supertest(web)

//         .post("/auth/login")
//         .send({
//             username: "test",
//             password: "rahasia"
//         })

//         logger.debug(response.body)
//         expect(response.status).toBe(200)
//         expect(response.body.status).toBe("success")
//         expect(response.body.data.access_token).toBeDefined()
//         expect(response.body.data.token_type).toBe("Bearer")
//         expect(response.body.data.user.id).toBeDefined()
//         expect(response.body.data.user.username).toBe("test")
//         expect(response.body.data.user.name).toBe("test")
//         expect(response.body.data.user.role).toBe("USER")
//     })

//     it("should reject login if user or password wrong", async() => {
//         const response = await supertest(web)

//         .post("/auth/login")
//         .send({
//             username: "salah",
//             password: "rahasia"
//         })

//         logger.debug(response.body)
//         expect(response.status).toBe(401)
//         expect(response.body.status).toBe("error")
//         expect(response.body.errors).toBeDefined()
//     })

//     it("should reject login if validation error", async() => {
//         const response = await supertest(web)

//         .post("/auth/login")
//         .send({
//             username: "",
//             password: ""
//         })

//         logger.debug(response.body)
//         expect(response.status).toBe(400)
//         expect(response.body.status).toBe("error")
//         expect(response.body.errors).toBeDefined()
//     })
//  }) 

describe('GET /', () => { 

    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able get user', async() => {
        const token = await UserTest.token()
        const response =  await supertest(web)

            .get("/users/current")
            .set("Authorization", `Bearer ${token}`)
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe("success")
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.role).toBe("USER")
    })

    it('should be reject get user if token invalid', async() => {
        const token = await UserTest.token()
        const response = await supertest(web)

        .get("/users/current")
        .set("Authorization", `invalid token ${token}`)

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe("error")
    })
})