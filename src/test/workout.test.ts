import supertest from "supertest"
import { web } from "../application/web"
import { UserTest, WorkoutTest } from "./test-util"
import { logger } from "../application/logging"

// describe('POST /workouts/history', () => { 

//     afterEach(async () => {
//         const user = await UserTest.get()
//         await WorkoutTest.deleteByUser(user.id)
//         await UserTest.delete(user.id)
//     })

//     it('should be able workouts', async() => {
//         const token = await UserTest.token()
//         const response = await supertest(web)

//             .post("/workouts/history")
//             .set("Authorization", `Bearer ${token}`)
//             .send({
//                 title: "test",
//                 calories: 100,
//                 duration: 10
//             })

//         logger.debug(response)
//         expect(response.status).toBe(200)
//         expect(response.body.status).toBe("success")
//         expect(response.body.data.id).toBeDefined()
//         expect(response.body.data.title).toBe("test")
//         expect(response.body.data.calories).toBe(100)
//         expect(response.body.data.duration).toBe(10)
//     })

//     it('should be reject workouts', async() => {
//         const token = await UserTest.token()
//         const response = await supertest(web)

//             .post("/workouts/history")
//             .set("Authorization", `Bearer ${token}`)
//             .send({
//                 title: ""
//             })

//         logger.debug(response.body)
//         expect(response.status).toBe(400)
//         expect(response.body.status).toBe("error")
//         expect(response.body.errors).toBeDefined()
//     })
// })

describe('GET /workouts/history/today', () => {

    afterEach(async () => {
        const user = await UserTest.get()
        await WorkoutTest.deleteByUser(user.id)
        await UserTest.delete(user.id)
    })

    it('should be able workouts today', async() => {
        const token = await UserTest.token()
        const user = await UserTest.get()
        
        await WorkoutTest.createFixtures(user.id)

        const startDate = '2026-01-09'
        const endDate = '2026-01-08'
        
        const response = await supertest(web)

            .get("/workouts/history/today")
            .set("Authorization", `Bearer ${token}`)
            .send({
                startDate,
                endDate
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe("success")
        expect(response.body.data.totalWorkout).toBe(1)
        expect(response.body.data.totalCalories).toBe(100)
        expect(response.body.data.totalDuration).toBe(10)

        expect(response.body.data.workouts.length).toBe(1)
        expect(response.body.data.workouts[0].title).toBe("Plank")
        expect(response.body.data.workouts[0].calories).toBe(200)
    })

    it('should be reject workouts today if unauthorized', async() => {
        const token = await UserTest.token()
        const user = await UserTest.get()
        
        await WorkoutTest.createFixtures(user.id)

        const startDate = '2026-01-09'
        const endDate = '2026-01-08'
        
        const response = await supertest(web)

            .get("/workouts/history/today")
            .set("Authorization", `Bearer token`)
            .send({
                startDate,
                endDate
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe("error")
        expect(response.body.errors).toBeDefined()
    })
 })