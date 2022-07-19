import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";



export const Tags = ({tagsItems}) => {
  return (

    <List>
      {tagsItems.map((name, i) => (
        <a
          key={i}
          style={{ textDecoration: "none", color: "black" }}
          href={`/tags/${name}`}
        >
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon >
                <TagIcon />
              </ListItemIcon>
              {(
                <ListItemText primary={name} />
              )}
            </ListItemButton>
          </ListItem>
          {/* <Link
             key={i}
             style={{ textDecoration: "none", color: "black" }}
             to={`/tags/${name}`}
            ></Link> */}
        </a>

      ))}
    </List>

  );
};
