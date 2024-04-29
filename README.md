An API which implements the basic CRUD operations for two tables: departments and users, characterized by a one to many relationship.

Each department has a maximum number of members defined during the creation of the department entities. The API handles all required validations and checks the inputted values.

The API also supports image uploads for each user (the user's profile picture), it updates and keeps track of the uploaded images accordingly.

Finally, it has a barebones authentication system developed using JWT, with a dedicated route to check the logged in user.

I have developed this with the purpose of practicing back-end developement using Node.js - the application has no front-end part as of yet.