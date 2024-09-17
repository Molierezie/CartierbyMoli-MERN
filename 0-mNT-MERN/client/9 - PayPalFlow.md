# <font color="#00b0f0">1️⃣ -  How add Paypal to your project ?</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

`Code Before & Task`

```jsx

```

### <font color="#4f81bd">1  - Solution  ✅ </font>

#### <font color="#b2a2c7">🧩 - setUp in website Paypal and index.js </font>


##### <font color="#a5a5a5">💻 - Code</font>

- go to the website : https://developer.paypal.com/dashboard/applications/sandbox
- click on `create-app`
- copy the client ID of paypal in your file .env

```js


app.get('api/config/paypal', (res,req)=>{

    res.send({ clientId : process.env.PAYPAL_CLIENT_ID})
})

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 


#### <font color="#b2a2c7">🧩 - setUp front-end </font>


- add paypalUrl in the constant file
- wrap the paypal provider in the route provider

##### <font color="#a5a5a5">💻 - Code</font>

```js




import { Route, RouteProvider, createRouterBrowser, createElementFromRouter} from ''
import Paypal from ''



const router = createRouterBrowser(

	createElementFromRouter(

		<Route path='' element={<App />}>


		<Route path='home' element={<Home />}/>


		
		
		
		
		
		
		</Route>
	)
)


<Provider store={store}>

	<PaypalProvider>
	<RouteProvider router={router}>
	<PaypalProvider>

</Provider>


```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 