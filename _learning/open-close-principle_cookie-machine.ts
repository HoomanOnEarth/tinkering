// Open/Closed Principle - SOLID
// That basically means that you should write your modules in a way that
// wouldn’t require you to modify it’s code in order to extend it’s behaviour.

type Cookie = { name: string }
type Recipe = { type: string; cook: CookFn }
type CookieMachine = { makeCookie: (type: string) => Cookie | Error }
type CookFn = () => Cookie

const makeRecipe = (type: string, cook: CookFn): Recipe => ({ type, cook })
const recipe_1 = makeRecipe('brownie', () => ({ name: 'Brownie!' }))
const recipe_2 = makeRecipe('greenie', () => ({ name: 'Greenie!' }))
//...
const recipe_N = makeRecipe('awesome cookie recipe', () => ({ name: 'Awesome Cookie!' }))

const cookieMachine = makeCookieMachine([recipe_1, recipe_2, recipe_N])
const brownie = cookieMachine.makeCookie('brownie') // { name: "Brownie!" }
const maybeCookie = cookieMachine.makeCookie('sunglasses') // Error: I dont know how to cook: sunglasses

// Create a cookie machine follow OCP
function makeCookieMachine(recipes: Recipe[]): CookieMachine {
  return {
    makeCookie(type: string): Cookie | Error {
      const recipe = recipes.find(recipe => recipe.type === type)
      return recipe
        ? recipe.cook()
        : new Error(`I dont know how to cook: ${type}`)
    },
  }
}

