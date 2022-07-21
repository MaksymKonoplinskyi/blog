import React from "react";

import { SideBlock } from "../SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { CommentEditMenu } from "./CommentEditMenu";


export const CommentsBlock = ({ items, children, curentUserId }) => {

  // const onClickRemove = () => { }

  return (
    <SideBlock title="Комментарии">

      <List>
        {items.map((obj, index) => (

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
                <CommentEditMenu />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
