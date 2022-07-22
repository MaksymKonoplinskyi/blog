import React from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from "react-redux";
import { editComentIndex, fetchAllComments, fetchRemoveComment } from "../../../redux/slices/post";
// import styles from "./Comment.module.scss";
// import styles from "./Comment.module.css";
// import clsx from 'clsx';

export const CommentEditMenu = ({ curentComment, index }) => {

  const dispatch = useDispatch()
  const { id } = useParams()
  // console.log(id);
  const onClickRemove = async () => {
    if (window.confirm('Вы действитльно хотите удалить комментарий?')) {
      await dispatch(fetchRemoveComment(curentComment._id))
      dispatch(fetchAllComments(id))
    }
  }
  const onClickEdit = () => {
    dispatch(editComentIndex(index))
    // console.log(curentComment.text);
  }


  return (
    <div>
      <div className="editButtons">
        <IconButton onClick={onClickEdit} color="primary">
          <EditIcon />
        </IconButton>

        <IconButton onClick={onClickRemove} color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>

    </div>
  )
}