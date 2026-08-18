🚀 MERN Stack Web Application

A full-stack web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application provides a secure, scalable, and user-friendly platform with authentication, database management, and RESTful APIs.

📌 Project Overview

This project is a modern full-stack web application developed using the MERN architecture.

The application follows a **client-server architecture**, where the React frontend communicates with the Node.js/Express backend through REST APIs. MongoDB is used for data storage, while Mongoose provides an efficient way to interact with the database.

Security is implemented using **bcrypt password hashing** and **JWT-based authentication**.

🛠️ Technologies Used

Frontend
* React.js – Building the user interface
* HTML5 – Page structure
* CSS3 – Styling and responsive design
* JavaScript (ES6+) – Application logic
* Axios / Fetch API – API communication

Backend

* Node.js – JavaScript runtime environment
* Express.js – Backend framework
* REST API – Communication between frontend and backend
* JWT (JSON Web Token) – User authentication and authorization
* bcrypt.js – Secure password hashing

 Database
* MongoDB – NoSQL database
* Mongoose – MongoDB ODM for schema and database operations

Development Tools

* Git & GitHub
* Visual Studio Code
* Postman
* npm

* 🔐 User Registration and Login

 🔐 Security Implementation
  
* Password Hashing with bcrypt

Passwords are never stored directly in the database.

Before storing a user's password, **bcrypt.js** generates a secure hash.

javascript
const hashedPassword = await bcrypt.hash(password, 10);

During login, the entered password is compared with the stored hash:
javascript
const isMatch = await bcrypt.compare(password, user.password);

This protects user passwords even if the database is compromised.

 JWT Authentication

After successful login, the server generates a JSON Web Token.

javascript
const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
);

The token is then used to access protected API endpoints.

 🗄️ Mongoose

Mongoose is used as the ODM (Object Data Modeling) library for MongoDB.

It allows the application to define structured schemas and interact with MongoDB efficiently.

 📂 Project Structure

project-root/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .env
├── .gitignore
└── README.md

Frontend will run on the URL displayed by Vite, typically:


🔌 API Architecture

The backend follows a RESTful API structure.

Example endpoints:

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Authenticate user   |
| GET    | `/api/users/profile` | Get user profile    |
| PUT    | `/api/users/profile` | Update user profile |
| DELETE | `/api/users/:id`     | Delete user         |

 🧪 API Testing

API endpoints can be tested using **Postman**.

Testing includes:

* Successful registration
* Duplicate email validation
* Invalid login credentials
* JWT authentication
* Protected routes
* CRUD operations
* Invalid request handling
* Server-side validation

## 📈 Future Enhancements

* Role-based access control
* Email verification
* OTP authentication
* Password reset functionality
* Cloud deployment
* Image/file upload
* Advanced search and filtering
* Notifications
* Admin dashboard
* Performance optimization

## 🎯 Learning Outcomes

Through this project, the following concepts were implemented:

* Full-stack MERN development
* RESTful API development
* MongoDB database management
* Mongoose schemas and models
* Authentication and authorization
* Password hashing using bcrypt
* JWT token management
* CRUD operations
* API integration
* Error handling
* Git and GitHub version control
* Environment variable management


👩‍💻 Developer

Abinayasri Gunasekaran

B.Tech – Information Technology

GitHub: `https://github.com/yAbinaya8146

## 📄 License

This project is developed for educational and portfolio purposes.
