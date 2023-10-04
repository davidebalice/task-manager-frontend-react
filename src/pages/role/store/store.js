import { useState, useEffect } from 'react'

export function apidata(){
 const storeData = [

    {
        id:1,
        name: new Date().toTimeString(),
        transaction_id: 1256,
        status: "active",
        payment_method:"bkash",
        sender_number: 13243,
        amount: 32432,
        date:"1-10-23",
        main_balence:687,

    },
    {
        id:2,
        name:"dregerewd",
        transaction_id: 563456,
        status: "pending",
        payment_method:"Nagad",
        sender_number: 133676,
        amount: 32432,
        date:"1-10-23",
        main_balence:687,

    },
    {
        id:3,
         name:"defgrewd",
        transaction_id: 7956,
        status: "pending",
        payment_method:"nagad",
        sender_number: 13543,
        amount: 32432,
        date:"1-10-23",
        main_balence:687,
    },
    
  

]
return {storeData}
}