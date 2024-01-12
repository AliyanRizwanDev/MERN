import express, { request, response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/BookModel.js";
import booksRoutes from "./routes/booksRoutes.js"
import cors from "cors"

const app = express();

// Middleware for parsing request body
// this middleware parses it and attaches the parsed data to the (request.body) property, making it accessible to subsequent middleware functions or route handlers.
app.use(express.json());

// Moddleware For Handling CORS Policy
// Option 1: Allow All Origins with default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
app.get("/",(request,response) =>{

    console.log(request);
    return response.status(888).send("Mern App"); // To send custom status

    // return response.send("Mern App"); //Status 200 OK Default

})






app.use("/books",booksRoutes);
// The above is a better way to handle routes to keep them in a folder 


// // Route to Save New Book
// app.post("/books", async (request,response)=>{
//     try {
        
//         if (!request.body.title || !request.body.author || !request.body.publishYear) {

//             return response.status(400).send("Send all required fields Title, Author, Pusblish Year")
            
//         }

//         const newBook = {
            
//             title: request.body.title,
//             author: request.body.author,
//             publishYear: request.body.publishYear
//         }

//         const book = await Book.create(newBook);
//         return response.status(201).send(book);



        
//     } catch (error) {

//         console.log(error);
//         response.status(500).send({message: error.message});
        
//     }
// })

// // Route to get all books from DataBase (/books is now get)
// app.get("/books",async (request,response)=>{

// try {

//     const books = await Book.find({});

//     // return response.status(200).json(books);

//     // Making Better output
//     return response.status(200).json({
        
//         count : books.length,
//         data : books

//     });


    
// } catch (error) {
//     console.log(error);
//     response.status(500).send({message: error.message});
// }




// })




// // Route to get books from DataBase by Id (/books is now get)
// app.get("/books/:id",async (request,response)=>{

//     try {
        
//         const {id} = request.params;
//         // alternative but above is better
//         // const id = request.params.id;

//         const book = await Book.findById(id);
    
        
//         return response.status(200).json(book);
    
    
        
//     } catch (error) {
//         console.log(error);
//         response.status(500).send({message: error.message});
//     }
    
    
    
    
//     })


// // Route to Update a Book
// app.put("/books/:id", async (request,response)=>{
//     try {
        
//         if (!request.body.title || !request.body.author || !request.body.publishYear) {

//             return response.status(400).send("Send all required fields Title, Author, Pusblish Year")
            
//         }


//         const {id} = request.params;

//         const result = await Book.findByIdAndUpdate(id,request.body);


//         if (!result) {

//             return response.status(404).json( {message : "Book not Found"})

//         }
//         else{

//             return response.status(201).json( {message : "Book Updated"})

//         }

        
//     } catch (error) {

//         console.log(error);
//         response.status(500).send({message: error.message});
        
//     }
// })


// // Route to Delete a Book
// app.delete("/books/:id", async (request,response)=>{
//     try {

//         const {id} = request.params;

//         const result = await Book.findByIdAndDelete(id);


//         if (!result) {

//             return response.status(404).json( {message : "Book not Found"})

//         }
//         else{

//             return response.status(201).json( {message : "Book Deleted"})

//         }

        
//     } catch (error) {

//         console.log(error);
//         response.status(500).send({message: error.message});
        
//     }
// })





mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App Connected to MongoDB")
        // We want app to listen if DB is Connected
        app.listen(PORT, ()=>{
            console.log(`App Listening on PORT ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error);
    })


