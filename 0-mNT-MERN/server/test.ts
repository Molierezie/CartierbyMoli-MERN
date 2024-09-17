


type Schema = {

    image : string,
    desc : string,
    date : number
}


const func = ( type : Schema) : any =>{

    return `the ${type.image} is very ${type.desc} at this date : ${type.date}`

}


func({

    image : "url",
    desc : "blablabka",
    date : 1222

})

console.log(func);
