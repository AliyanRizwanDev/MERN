import express from "express";
const router = express.Router();
import { Book } from "../models/BookModel.js"; // Added this 




// Changed all app to router eg. app.get() -> router.get()



// Route to Save New Book
router.post("/", async (request,response)=>{
    try {
        
        if (!request.body.title || !request.body.author || !request.body.publishYear) {

            return response.status(400).send("Send all required fields Title, Author, Pusblish Year")
            
        }

        const newBook = {
            
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook);
        return response.status(201).send(book);



        
    } catch (error) {

        console.log(error);
        response.status(500).send({message: error.message});
        
    }
})

// Route to get all books from DataBase (/books is now get)
router.get("/",async (request,response)=>{

try {

    const books = await Book.find({});

    // return response.status(200).json(books);

    // Making Better output
    return response.status(200).json({
        
        count : books.length,
        data : books

    });


    
} catch (error) {
    console.log(error);
    response.status(500).send({message: error.message});
}




})




// Route to get books from DataBase by Id (/books is now get)
router.get("/:id",async (request,response)=>{

    try {
        
        const {id} = request.params;
        // alternative but above is better
        // const id = request.params.id;

        const book = await Book.findById(id);
    
        
        return response.status(200).json(book);
    
    
        
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
    
    
    
    
    })


// Route to Update a Book
router.put("/:id", async (request,response)=>{
    try {
        
        if (!request.body.title || !request.body.author || !request.body.publishYear) {

            return response.status(400).send("Send all required fields Title, Author, Pusblish Year")
            
        }


        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id,request.body);


        if (!result) {

            return response.status(404).json( {message : "Book not Found"})

        }
        else{

            return response.status(201).json( {message : "Book Updated"})

        }

        
    } catch (error) {

        console.log(error);
        response.status(500).send({message: error.message});
        
    }
})


// Route to Delete a Book
router.delete("/:id", async (request,response)=>{
    try {

        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);


        if (!result) {

            return response.status(404).json( {message : "Book not Found"})

        }
        else{

            return response.status(201).json( {message : "Book Deleted"})

        }

        
    } catch (error) {

        console.log(error);
        response.status(500).send({message: error.message});
        
    }
})


export default router;