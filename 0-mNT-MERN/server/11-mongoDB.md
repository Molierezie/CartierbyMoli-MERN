# Brouillon


## Understand database

### Storing data

the best ways to store data in with a table format like mySQL

### Interaction with API

storing data isn't the only criteria for choice a database system
you have to taking into account also the ways to interact with your APIS (e.g I want to see the data, update, delete etc) how I can do that ?

#### with terminal

with the most famous database Microsoft/Oracle/MySQL we communicate with the database in the terminal with the commands with sql language

#### with AOI

## MongoDB in general

### What's it ?

Database Management system 

### NoSQL why ?



### Format Storing Data ?

MongoDb store the data in a Object format with collection unlike SQL we store in the table with rows 


## Installation


- configuration

    - run servuce as Network Service User
    - click on complete version

- Connect the database with the server
    - search mongoDB compass in your computer


## The command in mongoDB


### Create


#### create new collection

db.createCollection('name')

#### for create new document

db.Cartier.inserteOne({ name : 'Product' })


```js

const newUser = await User.create({

    name : req.body.name,
    email : req.body.email
})


newUser.save()


const newUser = new User({

    name : req.body.name,
    email : req.body.email
})

newUser.save()



```

#### for create multiple documents

db.collection.insertMany(
    [

    { name : "Ludo" }

    ],

     [

    { name : "Moli" }

    ],


)

### Fetch/Read/Find

#### view all the data

db.collection.find()

#### view data base on filter



db.collection.find({ proprety : "value"})


### Update

#### Update One document

- with method `updateOne` and the operator `$set`

    - this method update only the first find in the collection
    - 1st select the id then
    - 2nd use the operator :$set = write the properties and the new value as a key : "value"

db.collection.updateOne({ name : "Moli"}, { $set:{ category : "Electronincs"}})


#### Update many documents

db.collection.updateMany({ name : "AllianceByChannel"}, { $set: { price : 300€} })


### Delete

## Query Operator


### Comparaison query operation

#### `&gt` greater than 

e.g show example

db.collection.find(price :{gt : 400})
db.collection.find({ price : { gt: 400}, brand : {eq : 500}})


#### `&gte` greater or equal

e.g show example

#### `&lt` less than 

#### `&lte` less than 

#### `avoid error` less than 

##### `1`

- are theses request are the same and what's the good request for get the price greater than 500 and less than 1000 and why ?

1️⃣ db.collection.find({ price : {$gt : 500}}, {price : {$lt: 100} })

2️⃣ db.collection.find({ price : {$gt : 500}, {$lt : 100}})

3️⃣ db.collection.find( { price : {$gt:500, $lt:1000}})

###### good answers

3️⃣ db.collection.find( { price : {$gt:500, $lt:1000}})

another good answer this 2 request are the same and works :

const product = await Product.find({ price : { $gte : 2000, $lte : 4000}}).select('name brand price')

const product = await Product.find({ $and : [{price : {$gte : 2000}}, {price : {$lte : 4000}} ]  }, 'name brand price')





###### bad answers

1) 2) in this case the program take care only the last request so I will see only the price less than 100 and 

`2`

- If I want make a request with the same properties and I write this , the logic take care only the last request

const product = await Product.find({ price : { $lte : 2000}, price : {$gte : 4000}}).select('name brand price')

the good request 

### Logical query Operation


#### `$or`

At least one condition should be true

db.collection.find({ $or: { price : {$gt: 350}}, { priceFee : { $lt : 700 }}})


#### `$and`

##### remark 1

- If I have the same properties and I want make a request I have to write the keywords "$and"
- But If I want make a request and the properties are different I don't force to write the keywords "$and"

```js
const product = await Product.find({ price : {$gte : 4000}, brand : 'LOVE', name : "Alliance LOVE"}).select('name brand price') ✅

```
✅ explicity there are the "and"

```js
const product = await Product.find({ price : {$gte : 4000}, price : {$lte : 8000} }) 
```

❌ Don't work

```js
 const product = await Product.find({ price : { $gt : 4000, $lt:8000}}, 'name price') 

  const product = await Product.find({ $and : [ { price : {$gte : 4000} }, {price : {$lte : 8000}} ] }, 'name price') 
```

✅ ✅

#### <font color="#95b3d7">`$in`</font>

the same purpose to '$or'

- are theses request are the same and what's the good request for get the price greater than 500 and less than 1000 and why ?

- alternatif to $or, how I can write this request we a better way ?

```js
 const product = await Product.find({ $or : [ { brand : 'LOVE' }, {brand : 'TRINITY'}]}, 'name brand')
```

##### good answers ✅

```js
const product = await Product.find({ brand : { $in : ['LOVE', 'TRINITY']}}, 'name brand')

```

##### bad answers ❌

#### <font color="#95b3d7">`$nin`</font>

`explanation`

simply the opposite to '$in'



## Projection

`explanation`

I make a request but often I don't want see all the properties for example when the user login I don't want the password appears

### Method 1


1 - `Select`

---

- e.g I want see all only the brand and the price

```js

const product = await Product.find({}, 'brand price')

  // or

const product = await Product.find({}).select('brand price')


```

---

2 - `Select`

- e.g I want see all the properties without the _id , the name and the price these properties

```js

  const product = await Product.find({}, '-_id -name -brand -price')

  // or

const product = await Product.find({}).select('-_id -name -brand -price')


```
---

### Method 2

2 - `{ property : 1}`

the method select can be used the most of time but imagine I want fetch the data with the method aggregate the method '.select' don't works here so I can use another solution

```js

 const product = await Product.aggregate([

        {
          $match : { price : {$gte : 1000, $lte : 3000}}
        },
        {
          $project : { name : 1, price : 1}
        }
      ])

```


## Limit

## Sort

e.g ascending

from the largest price to the smallest

```js
  const product = await Product.find({}, '-_id price').sort({ price : -1})
```
e.g descending 

from the smallest price to the largest 

```js
  const product = await Product.find({}, '-_id price').sort({ price : 1})
```



## Agregation


it's simply on processus of large documents and data to get a result 
steps :

1. find document based on Category
2. group it
3. sort it
4. limit

why use aggregation ?

Because with the method I can't make multiple things 
but with the stage in the aggregate I can


I pass an array because in my document I have multiple stage(steps)

- $match : 
the first is the first stage for find the data

- $group :
It's only for grouping the documents with for example the same category, name etc

the '_id' in the group it's not refer the id of the documents, it's simply means I have to mention the columns or the property name by which I want to group. That create a new collection independant of the real collection and the id is for the unique property

e.g 1 :

show me the total sum product by category

```js

     const product = await Product.aggregate([

        {
          $match : { price : { $gte : 0}}
        }
        ,
        {
          $group : { _id : '$brand', totalPrice : { $sum : '$price'} }
        }
      ])


```








# <font color="#00b0f0">1️⃣ - useState()</font> 

## Brouillon listening

📸

## <font color="#4bacc6">🧠 - Theory ?</font>

### <font color="#92cddc">🔎 - What’s it state ?</font>

📔 - `Ressource`

- Link [Name Link ](url)

📝 - `explanation`

- The purpose of ….

👨🏾‍💻 - With my words 

- The purpose of ….


✏️ - `understand with diagram/schema`

## <font color="#4bacc6">🤔 - Use Case ?</font>

### <font color="#92d050">☑️ - Pros</font>

📔 - `Ressource`

📝 - `explanation`


### <font color="#c00000">🔻 - Cons </font>

📔 - `Ressource`

📝 - `explanation`


### <font color="#548dd4">👍🏾 - Alternative </font>

📔 - `Ressource`

📝 - `explanation`


## <font color="#e36c09">👨🏾‍💻 - Practice - Understand concept</font>

### <font color="#f79646">⌨️ - Basic Practice & remark & Interview question </font>




#### <font color="#95b3d7">2 - remark❔</font>

- alternatif to $or, how I can write this request we a better way ?

```js
 const product = await Product.find({ $or : [ { brand : 'LOVE' }, {brand : 'TRINITY'}]}, 'name brand')
```

##### good answers ✅

##### bad answers ❌



```js


await Product.aggregate([

    {
        $match : {$brand}
    },

    {
        $group : {_id : "name", avgPrice : {$avg : Price}}
    }
])



```