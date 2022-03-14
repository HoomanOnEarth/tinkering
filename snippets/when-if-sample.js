const fruits = [
  { id: 1, name: 'Mango', price: 18, status: 'in stock' },
  { id: 2, name: 'Orange', price: 7, status: 'in stock' },
  { id: 3, name: 'Apple', price: 30, status: 'in stock' },
  { id: 4, name: 'Pine', price: 20, status: 'out of stock' },
  { id: 5, name: 'Grape', price: 20, status: 'out of stock' },
]

const addTags = tags => item => ({ ...item, tags })
const addTax = tax => item => ({ ...item, price: item.price + tax })
const addSomething = something => item => ({ ...item, something })

const priceInRange = price => price > 9 && price < 22
const isNotGrape = name => name !== 'Grape'
const isNotOutOfStock = status => status !== 'out of stock'

const when = conditions => tasks => {
  return {
    check: target =>
      conditions.every(cond => cond)
        ? tasks.reduce((result, task) => task(result), target)
        : target,
  }
}

let superFruits = fruits.map(fruit =>
  when([
    priceInRange(fruit.price),
    isNotGrape(fruit.name),
    isNotOutOfStock(fruit.status),
  ])
  ([addTags('sales'),
    addTax(2),
    addSomething('bla bla blah')
  ])
  .check(fruit)
)

superFruits = fruits.map(fruit => {
  if (
    priceInRange(fruit.price) &&
    isNotGrape(fruit.name) &&
    isNotOutOfStock(fruit.status)
  ) {
    return [
      addTags('sales'),
      addTax(2),
      addSomething('bla bla blah')
    ].reduce((result, task) => task(result), fruit)
  }
  return fruit
})

console.log(superFruits)
