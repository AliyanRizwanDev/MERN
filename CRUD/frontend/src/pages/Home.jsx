import React, { useState } from 'react'
import Spinner from "../components/Spinner"
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox,MdOutlineDelete } from "react-icons/md";
import { useEffect } from 'react';
function Home() {

    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
    
        setLoading(true);
        axios
        .get("http://localhost:5555/books")
        .then((response)=>{
            // 2 data in below fuction because in out json file there are 2 parts count and data so to get in this data its needed
            setBooks(response.data.data); 
            setLoading(false);

        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);

        })


    },[])
  
  
  
    return (
    <div>
        {loading?(
            <Spinner/>
        ):(
           <div>

        <h1>Book List</h1>
        <Link to='/books/create'><MdOutlineAddBox/></Link>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Publish Year</th>
                    <th scope="col">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book,index)=>(
                            
                            
                            <tr key={book._id}>
                                <td>{index+1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publishYear}</td>
                                <td>
                                    <Link to={`/books/details/${book._id}`}>
                                    <BsInfoCircle/>
                                    </Link>

                                    <Link to={`/books/edit/${book._id}`}>
                                    <AiOutlineEdit/>
                                    </Link>

                                    <Link to={`/books/delete/${book._id}`}>
                                    <MdOutlineDelete/>
                                    </Link>

                                </td>
                                
                            </tr>

                        ))
                    }
                </tbody>
                </table>
        
      </div> 
        )}
      
    </div>
  )
}

export default Home
