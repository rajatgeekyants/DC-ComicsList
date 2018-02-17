import React, { Component } from "react"
import logo from "../assets/images/DC_Logo.jpg";

import ComicsListView from "./ComicsListView"
import { observer } from "mobx-react"

class App extends Component {
  constructor(props) {
    super()
    this.state = { selectedUser: null }
  }

  render() {
    const { group } = this.props
    const selectedUser = group.users.get(this.state.selectedUser)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DC Comics List</h1>
        </header>
        <button onClick={group.reload}>Reload</button>
        <select onChange={this.onSelectUser}>
          <option>- Select user -</option>
          {group.users.values().map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={group.drawLots}>Draw lots</button>
        {selectedUser && <User user={selectedUser} />}
      </div>
    )
  }

  onSelectUser = event => {
    this.setState({ selectedUser: event.target.value })
  }
}

const User = observer(({ user }) => (
  <div>
    <ComicsListView comicsList={user.comicsList} />
    <button onClick={user.getSuggestions}>Suggestions</button>
    <hr />
    <h2>{user.recipient ? user.recipient.name : ""}</h2>
    {user.recipient && <ComicsListView comicsList={user.recipient.comicsList} readonly />}
  </div>
))

export default observer(App)