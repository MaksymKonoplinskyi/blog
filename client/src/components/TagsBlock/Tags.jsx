import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import TagIcon from "@mui/icons-material/Tag"
import ListItemText from "@mui/material/ListItemText"

export const Tags = ({ tagsItems }) => {
  const onClickTag = (name) => {
    console.log(name);
  }

  return (

    <List>
      {tagsItems.map((name, i) => (
        <ListItem key={i} onClick={onClickTag} disablePadding>
          <ListItemButton >
            <ListItemIcon >
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
        // <TagItem
        //  tagName ={name}
        //   key={i}
        // // to={`/tags/${name}`}
        // />

      ))}
    </List>

  );
};
