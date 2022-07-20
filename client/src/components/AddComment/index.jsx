import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

export const Index = () => {
  const curentUserData = useSelector(state => state.auth.curentUserData)
  console.log(curentUserData);
  return (
    <>
      <div className={styles.root}>
      { curentUserData && <Avatar
        classes={{ root: styles.avatar }}
        src={`http://localhost:4444${curentUserData.avatarUrl}`}
      />}
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
