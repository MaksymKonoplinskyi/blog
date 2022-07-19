import React from "react";
import { SideBlock } from "../SideBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../redux/slices/allTags";
import { TagsSkeleton } from "./TagsSkeleton";
import { Tags } from "./Tags";


export const TagsBlock = () => {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags)
  const tagsItems = tags.items
  const isLoading = tags.status === 'loading'
  React.useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch]);
  

  return (
    <SideBlock title="Тэги">
      {isLoading ? (
        <TagsSkeleton />
      ) : (
        <Tags
          tagsItems={tagsItems}
        />
      )}
    </SideBlock>
  );
};
