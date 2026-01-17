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

export type WorkoutWeekResponse = {
    startDate: string
    endDate: string
    totalWorkout: number
    totalCalories: number
    totalDuration: number
    workouts: WorkoutResponse[]
}

export type WorkoutStatisticsResponse = {
    totalWorkout: number
    totalCalories: number
    totalDuration: number
}

export type WorkoutStreakResponse = {
    firstWorkoutDate: string | null
    lastWorkoutDate: string | null
    totalWorkoutsDays: number
    currentStreak: number
    longestStreak: number
}