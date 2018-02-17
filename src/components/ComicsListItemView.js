import React, { Component } from "react"
import { observer } from "mobx-react"
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree"

import ComicsListItemEdit from "./ComicsListItemEdit"

class ComicsListItemView extends Component {
  constructor() {
    super()
    this.state = { isEditing: false }
  }

  render() {
    const { item, readonly } = this.props
    return this.state.isEditing ? (
      this.renderEditable()
    ) : (
        <li className="item">
          {item.image && <img src={item.image} />}
          <h3 class="title">{item.name}</h3>
          <h4>{item.main}</h4>
          <p>${item.price} </p>
          {!readonly && (
            <span>
              <button onClick={this.onToggleEdit}>✏</button>
              <button onClick={item.remove}>❎</button>
            </span>
          )}
        </li>
      )
  }

  renderEditable() {
    return (
      <li className="item">
        <ComicsListItemEdit item={this.state.clone} />
        <button onClick={this.onSaveEdit}>💾</button>
        <button onClick={this.onCancelEdit}>❎</button>
      </li>
    )
  }

  onToggleEdit = () => {
    this.setState({
      isEditing: true,
      clone: clone(this.props.item)
    })
  }

  onCancelEdit = () => {
    this.setState({ isEditing: false })
  }

  onSaveEdit = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone))
    this.setState({
      isEditing: false,
      clone: null
    })
  }
}

export default observer(ComicsListItemView)