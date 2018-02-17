import React from "react"
import { observer } from "mobx-react"

import ComicsListItemView from "./ComicsListItemView"
import ComicsListItemEntry from "./ComicsListItemEntry"

const ComicsListView = ({ comicsList, readonly }) => (
  <div className="list">
    <ul>
      {comicsList.items.map((item, idx) => (
        <ComicsListItemView key={idx} item={item} readonly={readonly} />
      ))}
    </ul>
    Total: ${comicsList.totalPrice}
    {!readonly && <ComicsListItemEntry comicsList={comicsList} />}
  </div>
)

export default observer(ComicsListView)