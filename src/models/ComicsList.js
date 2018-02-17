import { types, getParent, destroy } from "mobx-state-tree"

export const ComicsListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: "",
    main: types.string
  })
  .actions(self => ({
    changeName(newName) {
      self.name = newName
    },
    changeMain(newMain) {
      self.main = newMain
    },
    changePrice(newPrice) {
      self.price = newPrice
    },
    changeImage(newImage) {
      self.image = newImage
    },
    remove() {
      getParent(self, 2).remove(self)
    }
  }))

export const ComicsList = types
  .model({
    items: types.optional(types.array(ComicsListItem), [])
  })
  .actions(self => ({
    add(item) {
      self.items.push(item)
    },
    remove(item) {
      destroy(item)
    }
  }))
  .views(self => ({
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0)
    }
  }))