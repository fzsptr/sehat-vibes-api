import supertest from "supertest"
import { web } from "../application/web"
import { UserTest } from "./test-util"
import { logger } from "../application/logging"

describe('POST /auth/register', () => {

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able register', async() => {
        const response = await supertest(web)

            .post("/auth/register")
            .send({
                username: "test",
                name: "test",
                password: "rahasia",
                weight: 60
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.weight).toBe(60)    
    })

    it('should reject register if request invalid', async() => {
        const response = await supertest(web)

            .post("/auth/register")
            .send({
                username: "",
                name: "",
                password: "test",
                weight: 10
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.status).toBe("error")
        expect(response.body.errors).toBeDefined()
    })
 })