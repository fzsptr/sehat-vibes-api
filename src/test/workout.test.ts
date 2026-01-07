import supertest from "supertest"
import { web } from "../application/web"
import { UserTest, WorkoutTest } from "./test-util"
import { logger } from "../application/logging"

describe('POST /workouts/history', () => { 

    beforeEach( async() => {
        await WorkoutTest.create()
    })

    afterEach(async () => {
        await WorkoutTest.delete()
        await UserTest.delete()
    })

    it('should be able workouts', async() => {
        const token = await UserTest.token()
        const response = await supertest(web)

            .post("/workouts/history")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "test",
                calories: 100,
                duration: 10
            })

        logger.debug(response)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe("success")
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.title).toBe("test")
        expect(response.body.data.calories).toBe(100)
        expect(response.body.data.duration).toBe(10)
    })

    it('should be reject workouts', async() => {
        const token = await UserTest.token()
        const response = await supertest(web)

            .post("/workouts/history")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: ""
            })

        logger.debug(response)
        expect(response.status).toBe(400)
        expect(response.body.status).toBe("error")
        expect(response.body.errors).toBeDefined()
    })
 })