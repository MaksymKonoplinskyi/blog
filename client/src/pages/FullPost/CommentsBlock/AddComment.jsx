import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComments, fetchCreateComment } from "../../../redux/slices/post";
import { useParams } from "react-router-dom";

export const Index = () => {
  const curentUserData = useSelector(state => state.auth.curentUserData)
 const dispatch = useDispatch()
  const [text, setText] = React.useState('');
  const { id } = useParams();

 const params ={
  text,
  postId:id
 }
  const onClickSend = async () => {
    await dispatch(fetchCreateComment(params))
    dispatch(fetchAllComments(id))
  }
  return (
    <>
      <div className={styles.root}>
        {curentUserData?.avatarUrl && <Avatar
          classes={{ root: styles.avatar }}
          src={`http://localhost:4444${curentUserData.avatarUrl}`}
        />}
        <form className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            type='comentText'
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={onClickSend} variant="contained">Отправить</Button>
        </form >
      </div>
    </>
  );
};
