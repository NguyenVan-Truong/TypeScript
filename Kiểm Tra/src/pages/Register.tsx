import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { User } from "~/interfaces/User"
import instance from "~/services"


const productSchema = Joi.object({
    email : Joi.string().required().email({tlds: false}),
    password : Joi.string().required().min(6),
})
const Register = () => {
    const navigate = useNavigate()
    const {register , handleSubmit,formState:{errors}}=useForm<User>({
        resolver : joiResolver(productSchema)
    })
    const onSubmit = async(user : User)=>{
		const {data} = await instance.post(`/register`,user)
		console.log(data)
		alert(" thanh cong")
		navigate("/login")
	}
 return (
   <div>
        <form onSubmit={handleSubmit(onSubmit)} >
       <h1>Dang ky</h1>

       <div className="form-group">
         <label htmlFor="">Email</label>
         <input className="form-control" type="email" {...register("email" , {required : true})} />
         {errors.email && (<div>{errors.email.message}</div>)}
       </div>

       <div className="form-group">
         <label htmlFor="">Password</label>
         <input className="form-control" type="password" {...register("password" , {required : true})} />
         {errors.password && (<div>{errors.password.message}</div>)}
       </div>

       <button className="btn btn-primary ">Dang ky</button>
     </form>
   </div>
 )
}

export default Register
