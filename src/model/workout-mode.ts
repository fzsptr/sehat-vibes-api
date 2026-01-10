export type CreateWorkoutRequest = {
    title: string
    calories: number
    duration: number
    ytUrl?: string
}

export type WorkoutResponse = {
    id: number
    title: string
    calories: number
    duration: number
    ytUrl?: string | null
    createdAt: Date
}

export type WorkoutTodayResponse = {
    date: string
    totalWorkout: number
    totalCalories: number
    totalDuration: number
    workouts: WorkoutResponse[]
}