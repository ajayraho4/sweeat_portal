import { useEffect, useState, useContext } from 'react';
import { SweeatsContext } from '../components/Context'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import UILDButton from './UILDButton'
import { db } from '../firebase';
import { onSnapshot, collection, getDocs, getDoc, where, doc, query, updateDoc, arrayUnion } from '@firebase/firestore'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default function ItemDialogBox({ open, onClose, feedback }) {
	const context = useContext(SweeatsContext)
	const [view, setView] = useState(0)
	const [items, setItems] = useState([])
	const [newItemItemName, setNewItemItemName] = useState("")
	const [newItemPrice, setNewItemPrice] = useState("")
	const [requestItemItemName, setRequestItemItemName] = useState("")
	const [requestItemDesc, setRequestItemDesc] = useState("")
	const [loading, setLoading] = useState(false)
	useEffect(()=>{
		async function getData(){
			try{
				const docSnap= await getDocs(collection(db, 'sweets'))
				console.log("[ItemDialogBox] getData", docSnap.docs.length)
				const array = docSnap.docs.map(doc=>{return {ref:doc.id, name:doc.data().Name}})
				console.log("[ItemDialogBox] array", array)
				setItems(array)
			} catch (err) {
				console.log("[ItemDialogBox] error", err)
			}
		}
		console.log("[ItemDialogBox] open ", open)
		if(open===true){getData()}
	}, [open])
	const addItem=async(e)=>{
		setLoading(true)
		console.log("[ItemDialogBox] addItem in")
		try {
			await updateDoc(doc(db, 'stores', context.data.store_fid), {
				items: arrayUnion({
					price: newItemPrice,
					rating:0,
					available:true,
					ref: doc(db, 'sweets', items.filter((i)=>i.name===newItemItemName)[0].ref),
				})
			})
			setTimeout(function(){
				setLoading(false)
				onClose()
				feedback(["success","Item successfully added."])
			}, 1000);
			console.log("[ItemDialogBox] addItem", items.filter((i)=>i.name===newItemItemName)[0].ref)
		} catch (err) {
			setLoading(false)
			onClose()
			feedback(["error","Failed to insert item."])
			console.log("[ItemDialogBox] addItem error", err)
		}
	}
	const requestItemSubmit=(e)=>{
		e.preventDefault()
		console.log("[requestItem] invoked")
	}
	return (
		<Dialog fullWidth open={open} onClose={onClose}>
			{
				view===0 ?
			<Grow in={view===0}>
			<Box className="h-screen overflow-y-hidden">
				<ValidatorForm onSubmit={addItem}>
					<DialogTitle className="font-bold">Add New Item</DialogTitle>
					<DialogContent className="h-96 overflow-y-hidden">
						<DialogContentText>
							Enter the details of the new item to be added.
						</DialogContentText>
						<div className="flex flex-col space-y-4 mt-4">
							<Autocomplete
								disablePortal
								id="combo-box-demo"
								options={[...items.map(i=>i.name)]}
								sx={{ width: 300 }}
								onChange={(e, v)=>setNewItemItemName(v)}
								renderInput={
									(params) => <TextValidator {...params} autoFocus
											margin="dense"
											id="name"
											type="text"
											fullWidth
											value={newItemItemName}
											validators={['required']}
											errorMessages={['Required field']}
											variant="outlined" label="Name of item" />
								}
							/>
							<TextValidator validators={['required']}
									onChange={(e)=>setNewItemPrice(e.target.value)}
									value={newItemPrice} errorMessages={['Required field']} 
									InputProps={{
								        inputProps: { 
								            min: 0 
								        }
								    }} margin="dense" id="name" label="Price" type="number" className="w-1/2" variant="outlined" />
							<Tooltip title="Coming soon...">
								<FormControlLabel sx={{fontSize:"0.2em"}} control={<Checkbox defaultChecked disabled />} label="Use default image for item" />
							</Tooltip>
						</div>
					</DialogContent>
					<DialogActions className="flex items-center mt-20">
						<div className="flex-1">
							<Button className="text-lg" onClick={()=>setView(1)}>
								Request new item
							</Button>
						</div>
						<div>
							<Button onClick={onClose}>Cancel</Button>
							<UILDButton loading={loading} text="Add" />
						</div>
					</DialogActions>
				</ValidatorForm>
			</Box>
			</Grow> : 
			<Zoom in={view===1}>
			<Box component="form" validate className="h-screen overflow-y-hidden">
			<ValidatorForm id="itemreqform" onSubmit={requestItemSubmit}>
				<DialogTitle>Request New Item</DialogTitle>
				<DialogContent className="h-96 overflow-y-hidden">
					<DialogContentText>
						Enter the details of the new item to be added.
					</DialogContentText>
					<div className="flex flex-col space-y-4 mt-4">
						<TextValidator autoFocus
							margin="dense"
							id="name"
							type="text"
							fullWidth
							value={requestItemItemName}
							onChange={(e)=>setRequestItemItemName(e.target.value)}
							validators={['required']}
							errorMessages={['Required field']}
							variant="outlined" label="Name of item" />
						<TextValidator margin="dense" id="desc" validators={['required']}
							errorMessages={['Required field']} label="Description" type="text" multiline
	          		rows={4} className="w-1/2" variant="outlined"
	          	value={requestItemDesc}
	          	onChange={(e)=>setRequestItemDesc(e.target.value)}/>
						<Tooltip title="Coming soon...">
							<Button variant="outlined" className="w-48">Upload Image</Button>
						</Tooltip>
					</div>
				</DialogContent>
				<DialogActions className="flex items-center mt-20">
					<div className="flex-1">
						<Button className="text-lg" onClick={()=>setView(0)}>
							Back
						</Button>
					</div>
					<div>
						<Button onClick={onClose}>Cancel</Button>
						<Tooltip title="Under Development">
						<Button form="itemreqform" type="submit" disabled={requestItemItemName===""||requestItemDesc===""}>Request</Button>
						</Tooltip>
					</div>
				</DialogActions>
			</ValidatorForm>
			</Box>
			</Zoom>
		}
		</Dialog>
	);
}