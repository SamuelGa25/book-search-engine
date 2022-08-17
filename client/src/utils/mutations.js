import {gql} from "@apollo/client";



export const GET_ME = gql`
    query Query{
        me{
            _id
            username
            email
            bookcount
            savedBooks{
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token user{
                _id
                username
                email
                bookcount
                savedBooks{
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }
            }
        }
    }
`;
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(email: $email, password: $password){
            token user{
                _id
                username
                email
                bookcount
                savedBooks{
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }
            }
        }
    }
`;
export const SAVE_BOOK = gql`
    mutation saveBook($booData: BookInput!){
        saveBook(bookData: $bookData){
            _id
            username
            email
            bookcount
            savedBooks{
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!){
        removeBook(bookId: $bookId){
            _id
            username
            email
            bookcount
            savedBooks{
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;