import React from "react"
import clsx from 'clsx'
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import TagIcon from "@mui/icons-material/Tag"
import ListItemText from "@mui/material/ListItemText"
import { useDispatch } from "react-redux"
import { fetchPostsWithTag } from "../../redux/slices/posts"
import styles from '../../pages/Home/Post/Post.module.scss'

export const Tags = ({ tagsItems }) => {
  const [selectedIndex, setSelectedIndex] = React.useState('');
  const dispatch = useDispatch()
  const handleListItemClick = (e, i, name) => {
    dispatch(fetchPostsWithTag(name))
    setSelectedIndex(name);
  };
//   useEffect((name, i) => {
//     dispatch(fetchPostsWithTag(name))
  
// }, [dispatch])

return (
  <div className={clsx(styles.root)}>
  <List>
    {tagsItems.map((name, i) => (
      <ListItem key={i} value={name} disablePadding>
        <ListItemButton
          selected={selectedIndex === name}
          onClick={(e) => handleListItemClick(e, i, name)}
        >
          <ListItemIcon >
            <TagIcon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  </div>
);
};
