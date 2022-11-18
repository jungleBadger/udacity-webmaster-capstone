## Intro

Udacity's Webmaster capstone project. This challenge aims to test the proficiency in an industry-standard architecture
for web applications.

Styling and error treatment are as simple as possible to proof the concept.

## Getting started

### 1. Install dependencies
```
npm i
```

### 2. Run docker-compose to hoist up the Postgres database
```
docker compose -f .\docker-compose.yml -p webmaster-capstone up
```

### 3. Run the npm script to migrate data tables
```
npm run db:create:test
npm run db:create:dev
```

### 4. Run the npm script to build and start backend application
```
npm run start:backend:dev
```

### 5. Run the npm script to build and start frontend application
```
npm run build:frontend
npm run start:frontend
```

### 6. Run the npm script to test the backend and frontend applications
```
npm run test:backend
npm run test:frontend
```


### 6. Access the frontend application in [localhost:3000](http://localhost:3000/login)

You can create a new account or use the following dummy account:

```
username: admin
password: admin123
```

After logging in, you will have access to a protected functionality.


## Components

### Backend

Standalone REST API application server.

#### Stack

* Node.js
* Express.js

#### Full documentation

You can find more details in [the dedicated README file](./backend/README.md)


### Frontend

Standalone UI application.

#### Stack

* React.js
* Redux

#### Full documentation

You can find more details in [the dedicated README file](./frontend/README.md)


## Tasks checklist


### Project Architecture


1. [X] Use npm to set up a project
2. [X] Use React to build a component-based project that promotes scalability
3. [X] Use Express.js to create a scalable backend
4. [X] Build a RESTful API using a PostgreSQL database
5. [X] Create a flexible and responsive Web Design using Flexbox and/or Grid

The project uses `npm` to run all necessary tasks, and there is no error on installing and executing dependencies.



### Data Management, Authentication, and Authorization

1. [X] Manage app state with Redux
2. [X] Implement JWT-based frontend authentication
3. [X] Implement JWT-based backend authentication

Redux is used and JWT based authentication is used both in frontend and backend.



### Testing

1. [X] Use Jest to create a test suite with at least 60% coverage of the frontend
2. [x] Use Jest to create a test suite with at least 60% coverage of the backend

The JEST testing covers key functionalities in the backend, and sanity checks in the frontend. It is ready to scale.

### Developer Best Practices

1. [X] Follow Git repo best practices
2. [X] Set up a logical folder structure for the project
3. [X] Automate linting and formatting using an npm script
4. [X] Use Javascript’s ES6 syntax
5. [X] Follow Typescript best practices

Project is available in a [GitHub repository](https://github.com/jungleBadger/udacity-webmaster-capstone) and folders follow a logical structure. Typescript is used.









