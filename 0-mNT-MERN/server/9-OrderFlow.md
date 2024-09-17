# <font color="#00b0f0">1️⃣ -  Order Flow</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

`Code Before & Task`

```jsx

```

### <font color="#4f81bd">1  - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 - in userController </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js


import Order  from "../models/orderModel.js";
import Product from "../models/productModels.js";
import asyncHandler from "express-async-handler";



// 0️⃣ why create this utils function ? 

const calcPrice = (orderItems)=>{

    const itemPrice = orderItems.reduce((acc, item)=> acc + item.price * item.quantity , O)

    const shippingPrice = itemPrice > 100 ? 0 : 10

    const taxrate = 0.15

    const taxPrice = itemPrice * taxrate

    const totalPrice = (
        itemPrice + shippingPrice + parseFloat(taxPrice)
    ).toFixed(2)
     //1️⃣ why parse.float ?


    return {

        itemPrice : itemPrice.toFixed(2),
        shippingPrice : shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
    }


}


export const createOrder = asyncHandler(

    async(req, res)=>{


        try {

            const { orderItems, shippingAddress, paymentMethod } = req.body;
    
          if(orderItems && orderItems.length === 0) {
                res.status(400)
                throw new Error('No order items')
            }
    
              const itemsFromDB = await Product.find({
    
              _id : { $in : orderItems.map((x)=> x._id )}
            
              })
              // 2️⃣ Why search in the collection of product and explain me this regex : $in
              
    
              const dbOrderItems = orderItems.map((itemFromClient)=>{
    
                const matchItemFromDb = itemsFromDB.find((itemFromDB)=> itemFromDB._id.toString() === itemFromClient._id)
              
                if(!matchItemFromDb){
    
                    res.status(400)
                    throw new Error(`Product ${itemFromClient.name} not found`)
                }
    
                return {
    
                    ...itemFromClient,
                    Product : itemFromClient._id,
                    price : matchItemFromDb.price,
                    _id : undefined
                }
    
                
              });
                // 3️⃣ Can you explain this each step of this function dbOrderItems please ?
    
              const {itemPrice, shippingPrice, taxPrice, totalPrice} = calcPrice(dbOrderItems);

              // 4️⃣ without destructing how I write this ?
    
              const order = new Order({
    
                orderItems : dbOrderItems,
                user : req.user._id,
                shippingAddress,
                paymentMethod,
                itemPrice,
                shippingPrice,
                taxPrice,
                totalPrice
    
              })
    
              const createOrder = await order.save()
    
              res.status(201).json(createOrder)
 
        } catch (error) {
            res.status(500)
            throw new Error(error)
        }


    }
)

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `const itemsFromDB`

	- This retrieves all products from the database that match the IDs in the order.

    - `$in`
        - learn in mongoDb course
        - here The `$in` operator is not a regex but a MongoDB query operator. It selects documents where the value of a field equals any value in the specified array. In this case, { $in: orderItems.map((x) => x._id) } creates a query that finds all products whose _id is in the array of _ids from the order items. This allows us to fetch all relevant products in a single database query, which is more efficient than querying for each product individually.

- 1️⃣ - `const dbOrderItems`

    - `orderItems.map`It maps over each item from the client's order (itemFromClient)
    - `const matchItemFromDb` For each client item, it finds a matching item from the database using find()
    - If no matching item is found, it throws an error otherwise If a match is found, it returns a new object that:



```js



export const calculateTotalSales = asyncHandler(

    async(req, res)=>{


        try{

            const orders = await Order.find()
    
            const calc = orders.reduce((sum, order)=> sum + order.price, 0)

            res.status(200).json(calc)


        }catch(error){


        }
        

    }
)




```


this 

router.put('/pay/:id', authentication, orderAsPaid)

router.put('/deliver/:id', authentication, orderAsDelivered)

and this 

router.put('/:id/pay', authentication, orderAsPaid)

router.put('/:id/deliver', authentication, orderAsDelivered)

is this the same logic ? 

