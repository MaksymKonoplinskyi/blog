import React from "react";
import styles from './Comment.module.scss';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { CommentEditMenu } from "./CommentEditMenu";
import { SideBlock } from "../../../components";
import { AddComment } from "./AddComment";
import { useSelector } from "react-redux";


export const CommentsBlock = ({ items, curentUserId }) => {
  const editCommentIndex = useSelector(
    state => state.fullPost.comments.editCommentIndex)
  return (
    <SideBlock title="Комментарии">

      <List>
        {items.map((obj, index) => (
          index === editCommentIndex ? (
            <AddComment key={index} editingComent={obj} index={index}/>
          ) : (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={obj.user.fullName}
                    src={`http://localhost:4444${obj.user.avatarUrl}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                />
                {
                  (obj.user._id === curentUserId) && (
                    <CommentEditMenu className={styles.editButtons} curentComment={obj} index={index} />
                  )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          )

        ))}
      </List>
      {(editCommentIndex === null) && <AddComment isCreationComment={true} />}
    </SideBlock>
  );
};
