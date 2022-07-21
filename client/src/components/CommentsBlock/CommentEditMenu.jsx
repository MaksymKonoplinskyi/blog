import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';


export const CommentEditMenu = ({ items, children, isLoading }) => {

  const onClickRemove = () => { }

  return (
    <>
      <Link to={`/posts/edit`}>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
      </Link>

      <IconButton onClick={onClickRemove} color="secondary">
        <DeleteIcon />
      </IconButton>
    </>
  )
}