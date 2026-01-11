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
    "id": 1,
    "name": "fauzi",
    "height": 170.5,
    "weight": 55.2,
    "role": "USER",
    "createdAt": "2025-12-13T10:00:00.000Z",
    "updatedAt": "2025-12-13T11:30:00.000Z"
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
