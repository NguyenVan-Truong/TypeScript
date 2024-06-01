import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { Product } from "./interfaces/Product";
import instance from "./services";
import AddProducts from "./pages/AddProducts";
import EditProducts from "./pages/EditProducts";
import Register from "./pages/Register";
import Login from "./pages/Login";


function App () {
	const navigate = useNavigate()
	const [products , setProducts] = useState<Product[]>([]);
	useEffect(()=>{
		(async()=>{
			const {data} = await instance.get(`products`)
			setProducts(data)
		})()
	},[])
	const handleRemove = async(id : Number)=>{
		const confirm = window.confirm("ban co muon xoa khong ?")
		if(confirm){
			await instance.delete(`products/${id}`)
			setProducts(products.filter(item => item.id !== id && item))
		} 
	}
	const handleAdd = async(product : Product)=>{
		const {data} = await instance.post(`products`,product)
		setProducts([...products,data])
		alert(" thanh cong")
		navigate("/")
	}
	const handleEdit = async(product : Product)=>{
		const {data} = await instance.put(`products/${product.id}`,product)
		setProducts(products.map((item)=> (item.id === data.id ? data : item)))
		alert(" thanh cong")
		navigate("/")
	}
	return (
		<div>
			<header>
				<ul className="a1">
					<li className="a2">
						<Link to="/"> Home</Link>
					</li>
					<li className="a2">
						<Link to="/add"> Add</Link>
					</li>
					<li className="a2">
						<Link to="/register"> Dang Ky</Link>
					</li>
					<li className="a2">
						<Link to="/login"> Dang Nhap</Link>
					</li>
				</ul>
			</header>
			<Routes>
				<Route path="/" element={<Home products={products} onDel={handleRemove}/>}></Route>
				<Route path="/add" element={<AddProducts onSubmit={handleAdd}/>}></Route>
				<Route path="/edit/:id" element={<EditProducts onSubmit={handleEdit}/>}></Route>
				<Route path="/register" element={<Register/>}></Route>
				<Route path="/login" element={<Login/>}></Route>
			</Routes>
		</div>
	);
};

export default App;
