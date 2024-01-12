import React, { useEffect, useState } from 'react'
import BackButton from "../components/BackButton";
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditBook() {
  
  const [title,setTitle] = useState("");
  const [author,setAuthor] = useState("");
  const [publishYear,setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  
  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/books/${id}`)
    .then((response)=>{

      setAuthor(response.data.author);
      setTitle(response.data.title);
      setPublishYear(response.data.publishYear);
      setLoading(false);
    }

    ).catch((error)=>{

      setLoading(false);
      alert("An Error Happened")
      console.log(error);
  })},[])
  const handleEditBook = ()=>{
    const data = {
    title,author,publishYear
    };
    setLoading(true);
    axios
    .put(`http://localhost:5555/books/${id}`,data)
        .then(()=>{
            setLoading(false);
            navigate('/');

        })
        .catch((error)=>{

            setLoading(false);
            alert("An Error Happened")
            console.log(error);

        })

    
  
  
  };
  
  
  return (
    <div>
      <BackButton/>
      <h1>Create Book</h1>
      {
        loading?(
          <Spinner/>
        ):(
          ""
        )
        
      }
      <label htmlFor="title">Title</label>
      <input type="text" name="" id="title" value={title} onChange={(event) => {setTitle(event.target.value)}} />

      <label htmlFor="author">Author</label>
      <input type="text" name="" id="author" value={author} onChange={(event) => {setAuthor(event.target.value)}} />

      <label htmlFor="py">Publish Year</label>
      <input type="text" name="" id="py" value={publishYear} onChange={(event) => {setPublishYear(event.target.value)}} />
      <button className="btn btn-primary" onClick={handleEditBook}>Save</button>
    </div>
  )
}

export default EditBook
