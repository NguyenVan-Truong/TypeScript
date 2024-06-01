import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { useForm } from "react-hook-form"
import { Product } from "~/interfaces/Product"

type Props = {
    onSubmit : (product : Product)=> void
}
const productSchema = Joi.object({
    title : Joi.string().required().min(6),
    price : Joi.number().required().min(1),
    description : Joi.string().allow("")
})
const AddProducts = ({onSubmit}: Props) => {
    const {register , handleSubmit,formState:{errors}}=useForm<Product>({
        resolver : joiResolver(productSchema)
    })
 return (
   <div>
        <form onSubmit={handleSubmit(onSubmit)} >
       <h1>Thêm</h1>

       <div className="form-group">
         <label htmlFor="">Title</label>
         <input className="form-control" type="text" {...register("title" , {required : true})} />
         {errors.title && (<div>{errors.title.message}</div>)}
       </div>

       <div className="form-group">
         <label htmlFor="">price</label>
         <input className="form-control" type="number" {...register("price" , {required : true})} />
         {errors.price && (<div>{errors.price.message}</div>)}
       </div>

       <div className="form-group">
         <label htmlFor="">description</label>
         <input className="form-control" type="text" {...register("description" , {required : true})}/>
        {errors.description&&(<div>{errors.description.message}</div>)}
       </div>
       <button className="btn btn-primary ">Thêm</button>
     </form>
   </div>
 )
}

export default AddProducts
