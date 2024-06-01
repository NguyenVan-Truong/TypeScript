import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Product } from "~/interfaces/Product"
import instance from "~/services"

type Props = {
    onSubmit : (product : Product)=> void
}
const productSchema = Joi.object({
    title : Joi.string().required().min(6),
    price : Joi.number().required().min(1),
    description : Joi.string().allow("")
})
const EditProducts = ({onSubmit}: Props) => {
    const {id} = useParams()
    const [product , setproduct]= useState<Product | null>(null)
    useEffect(()=>{
        (async()=>{
            const {data} = await instance.get(`products/${id}`)
            setproduct(data)
        })()
    },[])
    const {register , handleSubmit,formState:{errors}}=useForm<Product>({
        resolver : joiResolver(productSchema)
    })
     const onEdit = (product : Product)=>{
        onSubmit({...product,id})
     }
 return (
   <div>
        <form onSubmit={handleSubmit(onEdit)} >
       <h1>Thêm</h1>

       <div className="form-group">
         <label htmlFor="">Title</label>
         <input className="form-control" type="text" defaultValue={product?.title} {...register("title" , {required : true})} />
         {errors.title && (<div>{errors.title.message}</div>)}
       </div>

       <div className="form-group">
         <label htmlFor="">price</label>
         <input className="form-control" type="number" defaultValue={product?.price}{...register("price" , {required : true})} />
         {errors.price && (<div>{errors.price.message}</div>)}
       </div>

       <div className="form-group">
         <label htmlFor="">description</label>
         <input className="form-control" type="text" defaultValue={product?.description}{...register("description" , {required : true})}/>
        {errors.description&&(<div>{errors.description.message}</div>)}
       </div>
       <button className="btn btn-primary ">Thêm</button>
     </form>
   </div>
 )
}

export default EditProducts
