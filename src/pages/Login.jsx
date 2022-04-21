import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, where, query } from '@firebase/firestore'
import { SweeatsContext } from '../components/Context'

export default function Login() {
	const [storeCode, setStoreCode] = useState("");
	const [password, setPasssword] = useState("");
	const context = useContext(SweeatsContext)
	const navigate = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("submit")
		async function getData(){
			console.log("getData")
			try {
				console.log(storeCode, password)
				const queryQ=query(collection(db, 'stores'), where("store_code", "==", storeCode), where("password", "==", password))
				const docSnap= await getDocs(queryQ)
				if(docSnap.docs.length===1){
					context.data = {
						'store_id': docSnap.docs[0].data().store_id,
						'store_code': docSnap.docs[0].data().store_code,
						'location': docSnap.docs[0].data().location,
						'name': docSnap.docs[0].data().name,
						'store_rating': docSnap.docs[0].data().store_rating,
						'discount': docSnap.docs[0].data().discount,
						'adminEmail': docSnap.docs[0].data().adminEmail,
						'tagline': docSnap.docs[0].data().tagline,
						'delivery': docSnap.docs[0].data().delivery,
					}
					navigate('/store/')
				}
			} catch (err) {
				console.log("[Login] error ", err)
			}
		}
		getData()
	}
	return (
		<div className='flex flex-col'>
			<header className="flex pt-3 md:pt-6 w-full" style={{ backgroundImage: `url("../headerPurple.png")` }}>
				<h1 className='text-3xl md:text-5xl font-bold pl-3 md:pl-8'>Sweeat</h1>
			</header>
			<section className='flex flex-col justify-center items-center w-full py-4'>
				<h2 className='text-3xl font-bold'>Login</h2>
				<div className='flex justify-center rounded-lg border py-8 px-8 w-3/6 mt-5 drop-shadow-md bg-white'>
					<form className='flex flex-col justify-center items-center space-y-3 w-full' onSubmit={handleSubmit}>
						<div className='inputBox'>
							<div className='px-2'>
								<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#666"/></svg>
							</div>
							<input placeholder='Store Code' onChange={(e)=>setStoreCode(e.target.value)} type="text" />
						</div>	
						<div className='inputBox'>
							<div className='px-2'>
								<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#666" /></svg>
							</div>
							<input placeholder='Password' onChange={(e)=>setPasssword(e.target.value)} type="password" />
						</div><br />
						<input type="submit" className='button button-purple w-32' value="Login"/>
					</form>
				</div>
				<div className="font-bold text-sm mt-5 cursor-pointer" onClick={()=>navigate('/register/')}>
					New with Sweeat? Register your store here
				</div>
			</section>
		</div>
	)
}
