An API which implements the basic CRUD operations for two tables: departments and users, characterized by a one to many relationship.

Each department has a maximum number of members defined during the creation of the department entities. The API handles all required validations and checks the inputted values.

The API also supports image uploads for each user (the user's profile picture), it updates and keeps track of the uploaded images accordingly.

Finally, it has a barebones authentication system developed using JWT, with a dedicated route to check the logged in user.

I have included the Postman collection of routes the app implements, it also uses a mySQL database and connects to it using Sequelize. The database would need to be created using software such as XAMPP/Laragon (and the resetDb route would need to be called) prior to the usage of any other routes, otherwise none of them will work.

I have developed this with the purpose of practicing back-end developement using Node.js - the application has no front-end part as of yet.