import React from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';
function BackButton(/*{destination ='/'} Can pass the link like this also*/ ) {
  return (
    <div>
      <Link to="/">
        <BsArrowLeft/>
      </Link>
    </div>
  )
}

export default BackButton
