# Library Manager
A minimalistic easy to use interface for viewing, managing and renting books with user identity.
### Home
![image](https://github.com/ratul-gangopadhyay/lib-manager/assets/111196705/968e9695-3b92-43ef-9e36-007658fda308)
### Register page with form validations
![image](https://github.com/ratul-gangopadhyay/lib-manager/assets/111196705/84e484c8-a012-4ce2-9ff4-64196d71810e)
### Login page
![image](https://github.com/ratul-gangopadhyay/lib-manager/assets/111196705/3f3bc514-4204-4ddc-9c4a-a2c110eae9cc)
### Home page after login
![image](https://github.com/ratul-gangopadhyay/lib-manager/assets/111196705/7d42872c-d3f0-45f3-a83e-a5c190834189)
### Profile page
![image](https://github.com/ratul-gangopadhyay/lib-manager/assets/111196705/f6b3fb62-5939-49a4-8701-6d540ed370d2)

## About
A simple library manager application built with `react` and a dummy backend setup with `json-server`. The app enables a user to view a list of books and rent them after creating an account. The `Books` tab shows all the available books for renting. Anyone visiting this application can browse the books catalog but to rent a particular book the user has to login. The application has several validations in place to facilitate consistency in the data stored.
For example,
1. Users cannot create duplicate accounts.
2. Users cannot use same email for multiple accounts.
3. Wrong username/password prompts.
4. Users will be able to rent only one copy of a book. If they have rented already then `Rent` option will be disabled.

### For Developers
This application is built with various useful libraries like `react-router`, `react-toastify`, `react-redux`, `axios`, `redux-thunk`, `json-server` and many more. The state of the application is maintained with `Redux`. `redux-thunk` is used as a middleware to make api requests and dispatch appropriate actions. The password is stored before encryption and is read from database by decryption with a popular encryption library `bcryptjs`. The styling of this application is done by a mix of `plain css`, `styled-components`, `material-ui`. Apart from these various other useful react concepts like `reusable components`, `Context api`, `debouncing`, `memoizing` are explored in this project.

### Project Setup
Please follow the below steps to get this project running in your local:
1. Clone this project in your local machine with below command. (Make sure you have git installed in your machine)

```ruby
git clone https://github.com/ratul-gangopadhyay/lib-manager.git
```
2. Install `node_modules` by running the following commands:
```ruby
cd lib-manager
npm install
```

3. Add a `db.json` file in your root folder.
4. Copy the following json and paste in the `db.json` file that you created.

```ruby
{
  "books": [
    {
      "id": 1,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "rating": 4.5,
      "price": 12.99,
      "genre": "Classic",
      "copies": 97
    },
    {
      "id": 2,
      "title": "1984",
      "author": "George Orwell",
      "rating": 4.3,
      "price": 9.99,
      "genre": "Dystopian",
      "copies": 149
    },
    {
      "id": 3,
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "rating": 4.7,
      "price": 11.99,
      "genre": "Romance",
      "copies": 79
    },
    {
      "id": 4,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "rating": 4.2,
      "price": 10.99,
      "genre": "Classic",
      "copies": 119
    },
    {
      "id": 5,
      "title": "To the Lighthouse",
      "author": "Virginia Woolf",
      "rating": 4,
      "price": 8.99,
      "genre": "Modernist",
      "copies": 89
    },
    {
      "id": 6,
      "title": "Animal Farm",
      "author": "George Orwell",
      "rating": 4.1,
      "price": 7.99,
      "genre": "Political Satire",
      "copies": 198
    },
    {
      "id": 7,
      "title": "The Catcher in the Rye",
      "author": "J.D. Salinger",
      "rating": 4.4,
      "price": 10.49,
      "genre": "Coming-of-age",
      "copies": 95
    },
    {
      "id": 8,
      "title": "The Lord of the Rings",
      "author": "J.R.R. Tolkien",
      "rating": 4.8,
      "price": 19.99,
      "genre": "Fantasy",
      "copies": 180
    },
    {
      "id": 9,
      "title": "Brave New World",
      "author": "Aldous Huxley",
      "rating": 4.6,
      "price": 9.49,
      "genre": "Dystopian",
      "copies": 68
    }
  ],
  "users": []
}
```
5. Run the following command to start the application.
```ruby
npm start
```
**Please use dummy non-existing emails while creating user accounts.**

Note: The `json-server` is started automatically with the above command.




