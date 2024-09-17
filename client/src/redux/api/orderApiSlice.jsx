import { ORDER_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const orderSlice = apiSlice.injectEndpoints({


    endpoints : (builder)=>({


        createOrder : builder.mutation({

            query : (data)=>({

                url : `${ORDER_URL}/create-order`,
                method : "POST",
                body : data
            })
        }),



        getUserOrder : builder.query({

            query : ()=>({

                url : `${ORDER_URL}/user-order`
            }), keepUnusedDataFor : 5
    
        }),

       

        getOrderById : builder.query({

            query : (id)=>({

                url : `${ORDER_URL}/order/${id}`
            })
    
        }),

    


        getAllOrders : builder.query({

            query : ()=>({

                url : `${ORDER_URL}/all-orders`,
            })
        }),


        orderTotalCount : builder.query({

            query : ()=>({

                url : `${ORDER_URL}/total-count-orders`
            })
        }),


        orderTotalSales : builder.query({

            query : ()=>({

                url : `${ORDER_URL}/total-sales`
            })
        }),

        orderTotalSalesToDate : builder.query({

            query : ()=>({

                url : `${ORDER_URL}/total-sales-date`
            })
        }),


        payOrder : builder.mutation({

            query : ({ id, data})=>({

                url : `${ORDER_URL}/pay/${id}`,
                method : "PUT",
                body : data
            })
        }),

        
        deliverOrder : builder.mutation({

            query :(id) =>({
                url : `${ORDER_URL}/deliver/${id}`,
                method : "PUT"
            })
        }),


        getPaypalClientId: builder.query({
            query: () => ({
              url: PAYPAL_URL,
            }),
          }),
      



    })
})


export const {

    useCreateOrderMutation,
    useGetAllOrdersQuery,
    useDeliverOrderMutation,
    useGetOrderByIdQuery,
    useGetPaypalClientIdQuery,
    useGetUserOrderQuery,
    useOrderTotalCountQuery,
    useOrderTotalSalesQuery,
    useOrderTotalSalesToDateQuery,
    usePayOrderMutation

} = orderSlice