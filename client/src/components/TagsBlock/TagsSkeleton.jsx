import React from 'react';
import Skeleton from "@mui/material/Skeleton";
import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import TagIcon from "@mui/icons-material/Tag";

export const TagsSkeleton = () => {

    return (
        <>
            <List>
                {[...Array(5)].map((name, i) => (
                    <ListItem disablePadding>
                        <ListItemButton >
                            <ListItemIcon >
                                <TagIcon />
                            </ListItemIcon>
                            {(
                            <Skeleton width={100} />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
}
