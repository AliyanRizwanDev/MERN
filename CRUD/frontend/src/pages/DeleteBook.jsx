import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDeleteBook = () =>{

    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(()=>{
        setLoading(false);
        navigate('/');
      })
      .catch((error)=>{
        alert("Error Happend")
        console.log(error);
      })
  };
  

  return (
    <div>
      <BackButton/>
      <h1>Delete Book</h1>
      {loading ? (
        <Spinner/>
      ) : ("")}
        <div>
          <h2>Are you sure to delete this data?</h2>
          <button className="btn btn-danger" onClick={handleDeleteBook}>Delete</button>
        </div>
      
    </div>
  )
}

export default DeleteBook
