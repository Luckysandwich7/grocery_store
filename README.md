### CSE 341 Team Project
# CSE 341 Final project Proposal -grocery_store

## Contributors
### Ryan Alvord, Peace Andrew Arikpo, Sheyla Norton, Millie Swain, John Day
Grocery Store
### Contents
### Table of Contents	
# Application Info
## What will the API do?
Our API will be an inventory tracker/information hub/employee list as employees will be able to view/update/add/delete inventory of the stores departments (Deli, Bakery, and Produce) There will also be a catalog of all employees with their personal information and work contact information.
## How will your API utilize a login system?
We will use the role play of the required employees workEmail (Gmail) to help them log in and have access to all the data and functionality of updating, adding, and deleting inventory. For testing purposes we will use Gmail as the login source.
## What database will you use?
Luckysandwich7 Cluster - Database:  Grocery_store
https://cloud.mongodb.com/v2/643f2b791b529f489dcfc042#/metrics/replicaSet/643f2c937c58eb6c42828264/explorer/grocery_store/produce/find
## How will the data be stored in your database?
Four Collections in the Grocery_store database. Employees, Deli, Bakery, Produce
## How would a frontend be able to manage authentication state based on the data you provide?
Authorization and Authentication would only allow the Employees to make changes to the database. Meaning this database will not be public, more for internal business usage. Employees would have an employee email that would be authorized to make changes to the database. 
## What pieces of data in your app will need to be secured? How will you demonstrate web security principles in the development of this app?
Employee contact information would need to be secure. Login Information would need to be secure as well. We will be using the 0Auth security tokens.
## What file structure and program architecture will you use for this project (how will you organize your node project)? Why?
Controllers > Employee.js, Bakery.js , Deli.js, Produce.js; 
Routes > Index.js , Swagger.js,  Employee.js, Bakery.js , Deli.js, Produce.js
Middleware > validate.js, authenticate.js
Helper > validate.js
db > connect.js 
From the root: server.js , swagger.js, swagger.json, package.json , package-lock.json, .env file, gitignore file (for confidentiality), rest file for testing, 
## What are potential stretch challenges that you could implement to go above and beyond?
We will try to force a specific Gmail email to be able to login. For example, if our business was called Smith’s the email would be john.smith@smiths.com. The only emails that can login are required to have the @smiths.com.
# API Endpoint Planning
For this section, you’ll plan out what API endpoints you’ll need for your project. 

If you go to editor.swagger.io you’ll see the Grocery Store application documentation that they have. This can be a good point of reference because they demonstrate how to have multiple database entities (ie: pet, store, user), and CRUD operations for each with various ways of performing them. For this section of the Final Project Proposal, you will make a list of each api endpoint that will be supplied for each database entity. 
### So, if I was going to create the grocery store app, I’d put something like this: 
### Employees
GET /employee (get full employee list)
GET /employee/{employeeId} (get employee by Id)
POST /employee (create new employee)
PUT /employee/{employeeId} (update employee by Id)
DELETE /employee/{employeeId} (delete employee by Id)
### Deli
GET /deli (get the full deli data)
GET /deli/{deliId} (get deli by id)
POST /deli (create a new deli item)
PUT /deli/{deliId} (update deli item info)
DELETE /deli/{deliId} (delete deli item by Id)
### Bakery
GET /bakery (Retrieve all bakery items )
GET /bakery/{bakeryId} (get bakery item by Id)
POST /bakery (create new bakery item)
PUT /bakery/{bakeryId} (update bakery item by Id)
DELETE /bakery/{bakeryId} (delete bakery item by Id)
### Produce
GET /produce (get full produce list)
GET /produce/{produceId} (get produce by Id)
POST /produce (create new produce)
PUT /produce/{produceId} (update produce by Id)
DELETE /produce/{produceId} (delete produce by Id)

Thinking about this now will be extremely helpful for you because next week when you have to create the swagger documentation for all of this and publish it to heroku so it is ready for the rest of your project.

## Project Scheduling and Delegation
Plan out what tasks will get completed with each lesson remaining in the semester (Only edit highlighted text).
### Lesson 9 Tasks
Project Proposal
##3 Lesson 10 Tasks
Create Git Repo
Push to Heroku/Render
API DOCUMENTATION is complete and available at route ‘/api-docs’
Connect to MongoDB
Test Rest to make sure all database collections can be accessed, edited, deleted, etc…
### Lesson 11 Tasks
OAuth, Validation, and clean up project for completion.
### Lesson 12 Tasks
Accomplish stretch goal of only allowing specific emails to access the database.
### Lesson 13 Tasks
Verify code and prepare/submit Video Presentation

### How will you divide up work in your team to ensure the following tasks all get completed?
HTTP GET, GET (all, single), POST, PUT, DELETE  We are each assigned a MongoDB Collection to ensure it works
Node.js project creation All will participate in a virtual meeting
Create git repo and share with group All will participate in a virtual meeting
MongoDB setup All will participate in a virtual meeting
MongoDB Collections We will each create, add data, and run tests on our own collections (collections are within the same database)
API Swagger documentation for all API routes All will participate in a virtual meeting
Video presentation of node project, all routes functioning, mongoDB data being modified, and API documentation. We plan to all be present and share our screens for each piece of work we complete. Display working Rest files for our own project topics and that everything works on different computers and not just one.
## Potential Risks and Risk Mitigation Techniques
### What are the risks involved with you being able to finish this project in a timely manner?
Currently our team is very responsive and accountable for their own assignments so forseeing one team member fall behind is not likely. Though something could come up that prevents a member and we will have to step up to get their part done.
Testing and system errors may cause probation on completing our project. Pending Render deploys could cause us to halt and wait for it to complete to further our code and require us to meet additionally more than planned.
### How will you mitigate or overcome these risks?
If someone is to fall behind or not find available to complete their task, we will all step in and work to complete their part as a team. We could still split up the work like one works on the Route, another on the Controller, etc… We work before the Office hours of the professor and TA in case we need additional help and can come prepared with real questions and issues. We will also lean on each others knowledge from past projects to overcome errors and challenges.
