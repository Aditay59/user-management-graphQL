In this project I use ReactJs with Vite for frontend and NodeJS Express for backend and MongoDB for database.
At backend I created some APIs using the GraphQL @apollo/server. 
APIs have capabilities like -> In graphQL Query -> you can get data of All users
In mutations -> You can get details of particular user by the id
             -> You can create new user
             -> You can delete user by the id
             -> You can update the details of the particular user
             -> you can also authenticate a user by it's email and password

At the frontend you have three main screen -> One is login screen, where user can authentica it get access to site
                                           -> Then you have register page in which you can register/add new user to mongodb using graphQL mutation
                                           -> After you login you can view the users page which display all the users
In the users page for each user you have two button -> One is for deleting that user 
                                                    -> Second to update the user details with a modal box popup
At frontend I use @apollo/client to communicate with the backend graphQL APIs.
