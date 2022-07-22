import React from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchTags } from "../../redux/slices/allTags"
import { TagsSkeleton } from "./TagsSkeleton"
import { Tags } from "./Tags"
import { SideBlock } from "../SideBlock/SideBlock"


export const TagsBlock = () => {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags)
  const tagsItems = tags.items
  const isLoading = tags.status === 'loading'
  React.useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch])


  return (
    <SideBlock title="Тэги">
      {isLoading ? (
        <TagsSkeleton />
      ) : (
        <Tags tagsItems={tagsItems} />
      )}
    </SideBlock>
  );
};
