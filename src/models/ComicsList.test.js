import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { reaction } from "mobx";
import { ComicsListItem, ComicsList } from './ComicsList';

it("can create an instance of model", () => {
  const item = ComicsListItem.create({
    name: "DC Universe - Rebirth",
    main: "Wally West",
    price: 2.99
  })

  expect(item.price).toBe(2.99)
  expect(item.main).toBe("Wally West")
  item.changeName("Rebirth")
  expect(item.image).toBe("")
})

it("can create a comicslist", () => {
  const list = ComicsList.create({
    items: [
      {
        name: "DC Universe - Rebirth",
        main: "Wally West",
        price: 2.99,
      }
    ]
  })

  expect(list.items.length).toBe(1)
  expect(list.items[0].main).toBe("Wally West")
  expect(list.items[0].price).toBe(2.99)
})

it("can add new items - 2", () => {
  const list = ComicsList.create()
  const patches = []
  onPatch(list, patch => {
    patches.push(patch)
  })

  list.add(
    {
      name: "Doomed To Repeat It",
      main: "The Flash"
      price: 2.99
    }
  )

  expect(list.items.length).toBe(1);
  expect(list.items[0].name).toBe("Doomed To Repeat It")
  list.items[0].changeName("Doomed")
  expect(list.items[0].name).toBe("Doomed To Repeat It")

  expect(getSnapshot(list)).toMatchSnapshot()

  expect(states).toMatchSnapshot()
})

it("can calculate the total price of the comicslist", () => {
  const list = ComicsList.create({
    items: [
      {
        name: "DC Universe - Rebirth",
        main: "Wally West",
        image: "../assets/images/1. DC Universe - Rebirth.png",
        price: 2.99,
      },
      {
        name: "Doomed To Repeat It",
        main: "The Flash",
        image: "../assets/images/2. Doomed To Repeat It.jpg",
        price: 2.99
      }
    ]
  })

  expect(list.totalPrice).toBe(5.98)

  let changed = 0
  reaction(() => list.totalPrice, () => changed++)

  expect(changed).toBe(0)
  console.log(list.totalPrice)
  list.items[0].changeName("Test")
  expect(changed).toBe(0)
  list.items[0].changePrice(10)
})