# Workout API Spec

## Create Workout

Endpoint: POST /auth/register

Request Header:

- Authorization: Bearer <JWT_TOKEN>

Request Body:

```json
{
  "title": "Push Up",
  "calories": 100,
  "duration": 30,
  "ytUrl": "https://www.youtube.com/..."
}
```

Response Body 200 (OK) :

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Push Up",
    "calories": 100,
    "duration": 30,
    "ytUrl": "https://www.youtube.com/...",
    "createdAt": "2025-12-13"
  }
}
```

Response Body 400 (Bad Request):

```json
{
  "status": "error",
  "message": "workout data fail create"
}
```

## Get Workout Today

Endpoint: GET /workouts/history/today

Request Header:

- Authorization: Bearer <JWT_TOKEN>

Response Body 200 (OK) :

```json
{
  "status": "success",
  "data": {
    "totalWorkout": 15,
    "totalCalories": 1500,
    "totalDuration": 1800,
    "workouts": [
      {
        "id": 1,
        "title": "Push Up",
        "calories": 100,
        "duration": 30,
        "createdAt": "2026-01-10T05:00:00.000Z",
        "ytUrl": "https//www.youtube.com"
      },
      {
        "id": 1,
        "title": "Sit Up",
        "calories": 150,
        "duration": 30,
        "createdAt": "2026-01-10T05:00:00.000Z",
        "ytUrl": "https//www.youtube.com"
      }
    ]
  }
}
```

Response Body 401 (Unauthorized):

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

## Get Workout History

Endpoint: GET /workouts/history

Request Header:

- Authorization: Bearer <JWT_TOKEN>

Response Body 200 (OK) :

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Sit Up",
      "calories": 120,
      "duration": 30,
      "createdAt": "2026-01-10T05:00:00.000Z",
      "ytUrl": "https//www.youtube.com"
    },
    {
      "id": 2,
      "title": "Push Up",
      "calories": 120,
      "duration": 30,
      "createdAt": "2026-01-10T05:00:00.000Z",
      "ytUrl": "https//www.youtube.com"
    },
  ]
}
```

Response Body 401 (Unauthorized):

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

## Get Workout All

Endpoint: GET /workouts/history/statistics

Request Header:

- Authorization: Bearer <JWT_TOKEN>

Response Body 200 (OK) :

```json
{
  "status": "success",
  "data": { 
    "totalWorkout": 48,
    "totalCalories": 3000,
    "totalDuration": 300
  }
}
```

Response Body 401 (Unauthorzied):

```json
{
  "status": "error",
  "message": "Unauthorized"
}
``` 

## Get Workout Week

Endpoint: GET /workouts/history/weekly

Request Header:

- Authorization: Bearer <JWT_TOKEN>

Response Body 200 (OK) :

```json
{
  "status": "success",
  "data": {
    "startDate": "2026-01-17",
    "endDate": "2026-01-23",
    "totalWorkout": 15,
    "totalCalories": 1500,
    "totalDuration": 1800,
    "workouts": [
      {
        "id": 1,
        "title": "Push Up",
        "calories": 100,
        "duration": 30,
        "createdAt": "2026-01-10T05:00:00.000Z",
        "ytUrl": "https//www.youtube.com"
      },
      {
        "id": 2,
        "title": "Sit Up",
        "calories": 150,
        "duration": 30,
        "ytUrl": "https//www.youtube.com",
        "createdAt": "2026-01-10T05:00:00.000Z"
      },
      {
        "id": 3,
        "title": "Pull Up",
        "calories": 150,
        "duration": 30,
        "ytUrl": "https//www.youtube.com",
        "createdAt": "2026-01-10T05:00:00.000Z"
      }
    ]
  }
}
```

Response Body 401 (Unauthorized):

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```