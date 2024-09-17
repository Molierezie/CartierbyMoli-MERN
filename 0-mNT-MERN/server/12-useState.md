#brouillon  props & useRef


# Props

## definition
the props in simply a property which works like a object
e.g show the console.log of the props

A props is simply a parameter to a function

## Understand props with the comparaison with JS

- How I can edit the name of a function in JS ? 

## Why use props ?

- Edit dynamically data in the project


## place of props object is the compoenent JSX
the props object is always here but If I pass zero properties the object will be blank - 🎥 Code with Nader - Props lesson - 6min05
e.g in react get the same result using props and a function - 🎥 Code with Nader - Props lesson - 16min40

## What kind of data I can pass into the props ?

e.g pass a object, array and function in the props and after write like the props exist in the component for see 
React transform the attribute/property pass in the component call into the parent as a object, react create a new object
Behind the scene react wrap these properties into an object -  🎥 Code with Nader - Props lesson - 21min06

`non-standard attribute`

- usually in Html we can't pass a non-standard attribute as a property

## Props drilling

### Limits of props (props drilling) ?  🎥 Code with Nader - Props lesson - 33min55

in this diagram the blue arrow should be in the fname and lname color orange and green
- the value are the same , just the name of object are different

e.g show an example a props drilling with 3 components

## Children props

e.g 1 show me a basic example of children props


# useRef

e.g show an example

## behavior normal variable change after a re-render

whenever a component re-render the normal variable it reset to their initial value
in fact in the case of re-render the new value attribute for a normal variable doesn't persist

## behavior state variable change after a re-render

on the other hand if the component re-render we also seen the update of the state variable
state value variable persist throughout re-render happens

## Why use useRef Scenario for understand

I want a value persist througout re-render but I don't want this value being track as useState by the React app

Resume diagram in whimscal

state variable : if there are a re-render if the app or component, the value who changed persist and when the value of the state change it causes a re-render

normal variable : if there are a re-render in the app or component the value who changed doesn't persist and it is reset to their initial value and if this value changed it will not cause a re-render

## useRef combine these two behavior

the value of useRef persist throughout re-render but if I changed the value of useRef that's not trigger a re-render in the app
combination of normal variable and state variable

show an example

## How use useRef ?


1️⃣ whenever we use useRef 

the variable which store the value initial of useRef

```jsx

const testRef = useRef(10)

```

e.g here testRef don't directly hold the value

show the destructure of testRef for show why we use current

why because testRef create an object and inside this object the value is stored in the propertie current

show an example with change of state variable, normal variable and useRef change

! Only useRef variable can store element 

## Why use useRef ?

DOM Manipulation

Imagine I know when I change a data a lot that's cause always a re-render for example I have a carrousel and when I click in the button previous or next that's cause re-render but I don't want this re-render so instead to use useState() I can use useRef()

show another example for change style


