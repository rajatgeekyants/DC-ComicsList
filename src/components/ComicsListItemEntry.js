import React, { Component } from "react"
import { observer } from "mobx-react"

import ComicsListItemEdit from "./ComicsListItemEdit"

import { ComicsListItem } from "../models/ComicsList"

class ComicsListItemEntry extends Component {
  constructor() {
    super()
    this.state = {
      entry: ComicsListItem.create({
        name: "",
        price: 2.99,
        main: "",
      })
    }
  }

  render() {
    return (
      <div>
        <ComicsListItemEdit item={this.state.entry} />
        <button onClick={this.onAdd}>Add</button>
      </div>
    )
  }

  onAdd = () => {
    this.props.comicsList.add(this.state.entry)
    this.setState({
      entry: ComicsListItem.create({ name: "", price: 2.99, main: "" })
    })
  }
}

export default observer(ComicsListItemEntry)