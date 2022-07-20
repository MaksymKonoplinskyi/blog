import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

export const Index = () => {
  const curentUserData = useSelector(state => state.auth.curentUserData)
  // console.log(curentUserData);
  const [text, setText] = React.useState('');
  const onClickSend = async () => {
    
    console.log(text);
    const data = {}//await dispatch(fetchAuth(values))
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
