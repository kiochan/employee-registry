# Programming assignment for Software Engineer: Employee Registry

## General information

* for implementation, please use your GitHub account for the project
* make sure the repositories are public
* after completion submit a link with the repository that contains the solution
* make sure to show proper Git usage
* scheduled time: 7 days
* any changes after submitting the challenge will invalidate

## Application request

Our stakeholder Badumts GmbH is missing an overview of their employees.
So far, they don’t use any professional tool to manage their employees.
So, they requested us to create an employee management application.

The stakeholder requested following feature bundles in sequence:

* Bundle 1
  * Registration page so every employee can register itself
  * Employee must login before being able to use the application
  * Landing page as overview of existing employees
* Bundle 2:
  * A logged in employee can add another employee
  * Ability to import employees over a CSV file
* Bundle 3:
  * Being able to edit and delete employees
* Bundle 4:
  * Add and display comments to employees on employee detail page
  * Display author and date of the comment

## Additional information

* An employee data includes
  * username
  * email
  * last name
  * first name
  * address
  * role
* A comment consists of multiline text

## Task

Implement the backend and the frontend of the requested application.
Please note that the feature bundles were requested sequentially. Means, when we got the first request (Bundle 1) we didn't know anything yet about the upcoming feature bundles.

### Backend Part

The backend must be implemented as a RESTful webservice which implements the business logic using
node.js. For persistent storage please use MongoDB. Provide a clean appropriate architecture, pay
attention to segregation of duties.

### Frontend Part

* the frontend must be implemented with React
* it is up to you how to handle local and global states and how to integrate the API
* you can choose any UI framework you want
* using boilerplate's is allowed
* only last version of Mozilla Firefox and Chrome must be supported

*Hints: Please consider this code challenge as a team project. Your colleagues must understand your
code, architecture, workflow, and decisions. Please follow best practices.*
