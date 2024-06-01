import { Link } from "react-router-dom"
import { Product } from "~/interfaces/Product"


type Props = {
    products : Product[],
    onDel : (id :Number) => void
}

const Home = ({products , onDel}: Props) => {
  return (
    <div>
        <div>
        <table className='table table-bordered table-stripped'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Thao Tác</td>
                </tr>
            </thead>
            <tbody>
                {products.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td>
                            <button onClick={()=> onDel(Number(item.id))}>Xoa</button>
                            <Link to={`/edit/${item.id}`}><button>sua</button></Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default Home