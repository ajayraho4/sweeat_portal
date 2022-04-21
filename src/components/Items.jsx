import { useEffect, useState, useContext } from 'react';
import ItemCard from './ItemCard'
import { SweeatsContext } from '../components/Context'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { db } from '../firebase';
import { onSnapshot, collection, getDocs, getDoc, where, query } from '@firebase/firestore'
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import ItemDialogBox from './ItemDialogBox'
export default function Items() {
	const context = useContext(SweeatsContext)
	const [open, setOpen] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarText, setSnackbarText] = useState([]);
	const [openItemEDialog, setOpenItemEDialog] = useState(false);
	const [openItemDDialog, setOpenItemDDialog] = useState(false);
	const [search, setSearch] = useState("")
	const [items, setItems] = useState([])
	const [filteredData, setFilteredData] = useState([])
	const [loading, setLoading] = useState(true)
	const handleClickOpen=()=>{setOpen(true)};
	const handleClose=()=>{setOpen(false)};
	const showSnackbar=(msg)=>{
		setSnackbarText(msg)
		setOpenSnackbar(true)
	};
	const handleSnackbarClose=()=>{setOpenSnackbar(false)};
	const handleOpenItemEDialog=()=>{setOpenItemEDialog(true)};
	const handleCloseItemEDialog=()=>{setOpenItemEDialog(false)};
	const handleOpenItemDDialog=()=>{setOpenItemDDialog(true)};
	const handleCloseItemDDialog=()=>{setOpenItemDDialog(false)};
	const snackbarAction = (
		<IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleSnackbarClose}
		>
			<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
		</IconButton>
	);
	useEffect(()=>{
		async function getData(){
			return onSnapshot(query(collection(db, 'stores'), where("store_id", "==", context.data.store_id)),
				async(snapshot) => {
					const itemsArr = snapshot.docs[0].data().items
					const itemsDataArr=[]
					for(let i=0; i<itemsArr.length; i++){
						const docSnap= await getDoc(itemsArr[i].ref)
						itemsDataArr.push({...docSnap.data(), price:itemsArr[i].price, rating:itemsArr[i].rating})
					}
					setItems(itemsDataArr)
					setFilteredData(itemsDataArr)
					setLoading(false)
				}
			)
		}
		getData();
	}, [db])
	const handleSearch= (e) =>{
		const w = e.target.value.toLowerCase()
		setSearch(w)
		if(w===""){
			setFilteredData(items)
		} else {
			setFilteredData(items.filter(i=>i.Name.toLowerCase().includes(w)))
		}
	}
	return (
		<>
		{ !loading ? 
		<div className="flex -mt-4 flex-col" style={{width:"100%"}}>
			<div className="flex px-3 py-1 space-x-2" style={{width:"120%"}}>
				{
					(items.length)===0 ?

				<div className="border rounded-xl flex w-full bg-gray-100 items-center px-3">
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
					<input type="text" disabled className="w-full focus:outline-none py-2 px-3" placeholder="No items to search" />
				</div> :

				<div className="border rounded-xl flex w-full items-center px-3">
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
					<input type="text" className="w-full focus:outline-none py-2 px-3" placeholder="Search items" value={search} onChange={handleSearch} />
				</div>
			}
				<IconButton className="text-lg" onClick={handleClickOpen}>
					<svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
				</IconButton>
			</div>
			{
				(filteredData.length)===0?
				<div className="flex flex-col justify-center items-center py-4 px-3" style={{width:"200%"}}>
					<Typography variant="h5">No items</Typography>
					
					<div className="flex justify-center text-sm mt-2 md:text-base w-full">
						Press&nbsp;
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
						&nbsp;to add new item.
					</div>
				</div>:
				<div className="ml-5 mt-5 grid grid-cols-1 md:grid-cols-2 p-0 gap-8 gap-x-6">
				{
					filteredData.map(item=>(
						<ItemCard id={item.id} name={item.Name} price={item.price} rating={item.rating} image={item.imageURL||"/dish.jpg"} editButtonHandler={handleOpenItemEDialog} deleteButtonHandler={(o)=>handleOpenItemDDialog(o)}/>
					))
				}
				</div>
			}
		</div> :
		<Box className="flex justify-center items-center py-32 p-10" sx={{width:"600%"}}>
			<CircularProgress color="secondary" />
		</Box>
		}
		<ItemDialogBox feedback={showSnackbar} open={open} onClose={handleClose} />
		<ConfirmationDialog open={openItemDDialog} onClose={handleCloseItemDDialog} />
		<Snackbar  autoHideDuration={5000} open={openSnackbar} onClose={handleSnackbarClose}>
			<Alert onClose={handleClose} severity={snackbarText[0]} sx={{ width: '100%' }}>{snackbarText[1]}</Alert>
		</Snackbar>
		</>
	);
}
///NOTE____use auxiliary states to pass info
export const ConfirmationDialog=({open, onClose})=>{
	return(
		<Dialog fullWidth open={open} onClose={onClose}>
			<Grow in={open}>
			<Box>
				<DialogTitle className="font-bold">Delete Item</DialogTitle>
				<DialogContent>
					Delete <b>item</b> from items menu? This cannot be undone.
				</DialogContent>
				<DialogActions className="flex items-center mt-10 space-x-2">
					<Button onClick={onClose}>Cancel</Button>
					<Button type="submit" color="error" variant="contained">Yes</Button>
				</DialogActions>
			</Box>
			</Grow>
		</Dialog>
	)
}