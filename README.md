# EmployeeFrontend- This is the Fronted of the Full-stack CRUD Assignment

 About the Project:- This is a full-stack CRUD application built with:

- Frontend: Angular 21 
- Backend: Spring Boot (Java)  
- Database: MySQL  

The application allows users to **add, edit, delete, search, sort & paginate employees** in a responsive UI.

# Requirements:-
Make sure you have these installed:

### Backend Requirements
- Java 17+
- Maven 3.8+
- MySQL 8+
- Postman (optional)

### Frontend Requirements
- Node.js 24
- Angular CLI 21

#  Backend Setup (Spring Boot)

1. Import Database
Create a MySQL schema:
CREATE DATABASE employee_db;

This README provides everything to install, run and understand the project.
2.Update Database Credentials inside:-
Backend/employee-management/src/main/resources/application.properties

e.g. spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update

3.Run the backend:- 
Open Terminal :
cd Backend/employee-management
mvn spring-boot:run

4.Backend Starts at:-
http://localhost:8080

Necessary API Endpoints:- 

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/api/employees`      | Get all employees |
| POST   | `/api/employees`      | Add employee      |
| PUT    | `/api/employees/{id}` | Update employee   |
| DELETE | `/api/employees/{id}` | Delete employee   |

## Frontend Seup (Angular) 
1. Install Dependencies :-
   cd Frontend/employee-frontend
   npm install

2.Update Backend URl (if needed)
inside: src/app/services/employee.ts
set: src/app/services/employee.ts

3.Run Angular app:-
ng serve -o
it opens at:- http://localhost:4200

## How to Run the Full Application
1. Start MySQL
2. Start Springboot Backend:- mvn spring-boot:run
3. Start Angular Frontend:- ng serve -o
Features Implemented
Backend:-
1.CRUD Operations
2. REST APIs
3. MySQL Integration
4. Layered Architechture (Controller----> Service-----> Repository)

Frontend:-
1. Add Employee
2. Edit Employee
3. Delete Employee
4. Pagination
5. Sorting
6. Searching
7. Responsive UI
8. Dashboard cards





