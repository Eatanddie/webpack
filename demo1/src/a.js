require('@babel/polyfill')

console.log('a.js')

const fn = () => {
    console.log('arrow')
}

fn()

class A {
    a = 1
}

let a = new A()
console.log(a.a)


function * gen() {
    yield 1
}

console.log(gen().next())

'aaa'.includes('a')