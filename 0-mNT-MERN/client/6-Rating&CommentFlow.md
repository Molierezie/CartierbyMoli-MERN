
## HomeWork

- Map reviews and top product with style



```js



import mongoose from 'mongoose'


const { ObjectId} = mongoose.schema.Type
const { schema } = mongoose

const review = new schema({

    name : { type : String, required : true},
    ratings : { type : Number , required : true},
    comments : { type : String, required : true },
    user : { type : ObjectId , ref : 'User' }
})

const product = new schema({

    reviews = [review]
})


```


```js


{ product.reviews((re)=>(






))}



```




```js


import {useParams} from ''
import { ProductById, createReview } from ''



const Product = ()=>{
    

    const { ProductId } = useParams()

    const [CreateReview] = createReview(ProductId)



    const submitHandler = (e)=>{
    
        e.preventDefault()


        if( product.reviews.filter((p)=> p.user._id == userInfo)){

            toast.error('You are already give a review')
        }
    
        try{
    
    
            const res = await CreateReview({ ProductId, ratings, comments}).unwrap()

            if(res.error){

                toast.error(res?.data?.message || res.error)
            }else{

                toast.success('Commentaire bien ajouté')
                refetch()
                navigate()
            }
    
    
        }catch{
    
    
    
        }
    }


    const addToCart = ()=>{


    }


    return(



    )
}





```