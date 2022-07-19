import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "../SideBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../redux/slices/allTags";


export const TagsBlock = () => {
  const dispatch = useDispatch()
  const tags  = useSelector(state => state.tags)
  const items = tags.items
  const isLoading = tags.status === 'loading'
  React.useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch]);


  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
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
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  );
};
