const {AuthenticationError} = require('apollo-server-express');
const {User} = require('../models');
const {signToken}  =require('../utils/auth');


const resolvers = {
    Query:{
        me: async (parent, args, context) =>{
            if (context.user){
                const user = await User.findOne({_id: context.user._id}).select('-__v -password');
                return user;
            }
            throw new AuthenticationError('Log in first!');
        },
    },
    Mutation: {
        login: async(parent, {email, password})=>{
            const user = await User.findOne({email });
            
            if (!user){
                throw new AuthenticationError('Try again, Wrong credentials!')
            }
            const correctPw = await User.isCorrectPassword(password);
            
            if (!correctPw){
                throw new AuthenticationError('Try again, Wrong credentials!')
            }
            const token = signToken(user);
            return {token,user};
        },
        addUser: async(parent, args)=>{
            console.log("ADD_USER")
            const user = await User.create(args)
            const token = signToken(user);

            return {token, user};
        },
        saveBook: async(parent, {bookData}, context)=>{
            if(context.user){
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push:{savedBooks: bookData}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('Log in first!');
        },
        removeBook: async(parent, {bookId}, context)=>{
            console.log(context);
            if (context.user){
                const removeBook = User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull:{savedBooks: bookId}},
                    {new: true}
                );
                return removeBook
            }
            throw new AuthenticationError('Log in first!');
        }
    }
}

module.exports = resolvers;