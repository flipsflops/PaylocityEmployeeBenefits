# Developer Requirements

## React

-   Will `npm install`
-   Verify you have a .env.development file
-   Will `npm build`

## .NET

-   Will build the main .sln file which causes all projects in dotnet can build

## SQL

-   Login Info for SQL Server
    -   Server name: paylocity-1.cqu9gtsxbecx.us-east-1.rds.amazonaws.com
    -   Login: admin
    -   Password: password123
    -   DB name: employeemanagement

## Summary

-   Web app for Paylocity's Code Challenge. This Web app assumes an admin perspective on managing any overhead for their employees. This includes the following: employee view, employee creation, employee update and employee dependent(s) management.
-   The Web app's front-end portion is built-off of the initial set-up from create-react-app. Styling is done through (2) main tools--CSS Modules and bootstrap/reactstrap. The file-structure features a central hub for exporting and importing via index.js files.
-   The Web app's business logic for employee benefits cost is currently done dynamically and can be seen when you go to View Employees-> Right-click an employee card-> Left-click Update.
-   You are able to view all employees within the RDS-deployed MSSQL server on the front-end. Update, delete functionality is not implemented
-   The Web app's middle-tier is built-off of the initial set-up from .NET's Web App API.

## To-do

-   Testing
    -   Implementation of testing (H)
        -   Test front-end via Cypress
        -   Test API via Postman
-   Security
    -   SQL Injection testing for forms (H)
    -   Implementation of User Auth (M)
    -   Implementation of route verification (L)
-   UX
    -   Develop a color scheme (L)
    -   Toastrs
