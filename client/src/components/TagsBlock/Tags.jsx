import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import TagIcon from "@mui/icons-material/Tag"
import ListItemText from "@mui/material/ListItemText"
import { useDispatch } from "react-redux"
import { fetchPostsWithTag } from "../../redux/slices/posts"

export const Tags = ({ tagsItems }) => {
  const [selectedIndex, setSelectedIndex] = React.useState('');
  const dispatch = useDispatch()
  const handleListItemClick = (e, i, name) => {
    dispatch(fetchPostsWithTag(name))
    setSelectedIndex(i);
  };
//   useEffect((name, i) => {
//     dispatch(fetchPostsWithTag(name))
  
// }, [dispatch])

return (

  <List>
    {tagsItems.map((name, i) => (
      <ListItem key={i} value={name} disablePadding>
        <ListItemButton
          selected={selectedIndex === i}
          onClick={(e) => handleListItemClick(e, i, name)}
        >
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
