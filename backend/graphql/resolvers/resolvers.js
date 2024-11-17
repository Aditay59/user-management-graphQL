const axios = require('axios');
const Users = require('../../mongodb/models/userSchema');
const bcrypt = require('bcryptjs');

const generateId = () => {
    return String(Math.floor(Math.random() * 100 + Math.random() * 312));
}

const resolvers = {
    Query: {
        getAllUsers: async () => {
            try {
                // const response = await axios.get("http://localhost:4500/Users");
                const dbUsers = await Users.find();
                return dbUsers;
            } catch(err) {
                console.error(`😭 Ohh You got an error while fetching the users from json-server:${err}`);
                throw new Error("Failed to fetch the Users data from json-server");
            }
        }
    },
    Mutation: {
        getUserById: async (_, {id}) => {
            try {
                // const response = await axios.get(`http://localhost:4500/Users/${id}`);
                const getUser = await Users.findOne({id});
                if(!getUser) throw new Error("User not found at database");
                return getUser;
            } catch(err) {
                throw new Error(`Failed to fetch the User data from json-server:${err}`);
            }
        },
        authenticateUser: async (_, {email, password}) => {
            try {
                // const response = await axios.get(`http://localhost:4500/Users/`);
                const getUser = await Users.findOne({email});
                if(!getUser) throw new Error("User not found at database");
                const isMatchPass = await bcrypt.compare(password, getUser.password);
                if(isMatchPass){
                    return getUser;
                } else {
                    throw new Error(`Password mistatch`)
                }
                
            } catch(err) {
                throw new Error(`${err}`);
            }
        },
        createNewUser: async (_, {user}) => {
            
            try {
                // const response = await axios.get(`http://localhost:4500/Users`);
                // const ifUserExists = response.data.find(responseUser => responseUser.email === newUser.email);
                // if(ifUserExists) {throw new Error('User already exists');};
                // await axios.post(`http://localhost:4500/Users`, newUser).catch(err => {
                //     throw new Error(`Failed to create new user at the json-serer: ${err}`);
                // })
                const getuser = await Users.findOne({email: user.email});
                if(getuser) throw new Error(`User already exists`);
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const newUser = new Users({
                    ...user,
                    password: hashedPassword,
                    id: generateId(),
                    createdAt: new Date().toLocaleDateString()
                });
                await newUser.save();
                return "New User Created";
            } catch(err) {
                throw new Error(`${err}`);
            }
        },
        updateUserDetails: async (_, {id, user}) => {
            try {
                // const getUser = await axios.get(`http://localhost:4500/Users/${id}`);
                // await axios.patch(`http://localhost:4500/Users/${id}`, user);
                // if(!getUser) throw new Error(`Can't update user details`);
                
                const updates = {$set: {...user}};
                const options = {new: true};
                await Users.findOneAndUpdate({id},updates,options).catch(err=>{
                    throw new Error(`Error in updating the user details:${err}`);
                });
                return "User Updated with new details";
            } catch(err) {
                throw new Error(`Failed to update the user with given details: ${err}`);
            }
        },
        deleteUseById: async (_, {id}) => {
            try {
                // const response = await axios.get(`http://localhost:4500/Users/${id}`);
                // if(!response.data) throw new Error(`User not found in the database`);
                // await axios.delete(`http://localhost:4500/Users/${id}`);
                
                const getUser = await Users.findOne({id});
                if(!getUser) throw new Error(`User not found in the database`);
                await Users.deleteOne({id});
                return `User deleted from the database: ${id}`;
            } catch(err) {
                throw new Error(`Failed to delete the user with id: ${id}: ${err}`);
            }
        }
    }
};

module.exports = resolvers;