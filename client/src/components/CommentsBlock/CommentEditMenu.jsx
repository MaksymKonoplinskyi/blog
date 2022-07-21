import React from "react";
import { Link, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from "react-redux";
import { fetchAllComments, fetchRemoveComment } from "../../redux/slices/post";


export const CommentEditMenu = ({ curentComment}) => {

  const dispatch = useDispatch()
  const {id} = useParams()
  // console.log(id);
  const onClickRemove = async () => {
    if (window.confirm('Вы действитльно хотите удалить комментарий?')) {
      await dispatch(fetchRemoveComment(curentComment._id))
    dispatch(fetchAllComments(id))
    }
   }

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