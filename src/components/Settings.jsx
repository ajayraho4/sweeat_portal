import { useState, useEffect, useContext } from 'react';
import { SweeatsContext } from '../components/Context'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Grow from '@mui/material/Grow';
import { ValidatorForm } from 'react-material-ui-form-validator';

export default function Settings() {
	const context = useContext(SweeatsContext)
	const [openPw, setOpenPw] = useState(false)
  const [openSus, setOpenSus] = useState(false)
  const [openRDel, setOpenRDel] = useState(false)
  const [editing, setEditing] = useState(false)
  const [storeName, setStoreName] = useState(context.data.name)
  const [storeAdminEmail, setStoreAdminEmail] = useState(context.data.adminEmail)
  const [storeAddress, setStoreAddress] = useState("")
  const [storeTagline, setStoreTagline] = useState(context.data.tagline)
  const [storeDelivery, setStoreDelivery] = useState(context.data.delivery)
	const handleClickOpenPw=()=>{setOpenPw(true)};
  const handleClosePw=()=>{setOpenPw(false)};
	const handleClickOpenSus=()=>{setOpenSus(true)};
  const handleCloseSus=()=>{setOpenSus(false)};
	const handleClickOpenRDel=()=>{setOpenRDel(true)};
  const handleCloseRDel=()=>{setOpenRDel(false)};
 
  useEffect(()=>{
  	if(storeName!=context.data.name||storeAdminEmail!=context.data.adminEmail||storeTagline!=context.data.tagline||storeDelivery!=context.data.delivery){
  		setEditing(true)
  	} else {
			setEditing(false)
  	}
  }, [storeName,storeAdminEmail,storeAddress,storeTagline,storeDelivery])
	return (
		<>
		<Box component="form" noValidate autoComplete="off" className="px-5 -mt-1">
			<Typography color="inherit" variant="h6" id="tableTitle" component="h1">
				Settings
			</Typography>
			<Box component="div" className="flex flex-col space-y-6 px-5 py-5" style={{ width: "100%"}}>
				<div className="flex w-full justify-between space-x-2">
					<TextField className="w-full" onChange={(e)=>{setStoreName(e.target.value)}} value={storeName} defaultValue={context.data.name} label="Store Name" />
					<TextField className="w-full" onChange={(e)=>{setStoreAdminEmail(e.target.value)}} defaultValue={context.data.adminEmail} type="email" label="Store Admin Email" />
				</div>
				<TextField onChange={(e)=>{setStoreAddress(e.target.value)}} multiline rows={3} defaultValue="Default Value" label="Store Address" />
				<div className="flex w-full justify-between items-center space-x-2">
					<TextField sx={{display:'none'}} disabled />
					<TextField onChange={(e)=>{setStoreTagline(e.target.value)}} className="w-full" defaultValue={context.data.tagline} label="Store Tagline" />
					<Tooltip title="Offer food delivery to customers">
						<Switch checked={storeDelivery} onChange={(e)=>{setStoreDelivery(e.target.checked)}} color="warning" /></Tooltip> Delivery
				</div>
				<div className="flex w-full justify-end space-x-2 px-4">
					<Button variant="outlined" onClick={handleClickOpenPw}>Change Password</Button>
					<Tooltip title="Change tabs to discard changes"><Button variant="outlined" disabled={!editing}>Save Changes</Button></Tooltip>
				</div>
				<div className="flex w-full justify-end space-x-2 p-4 border-2 border-red-300/[0.3] rounded-lg">
					<Button className="w-64" onClick={handleClickOpenSus} variant="contained" color="error"> Suspend Service Temporarily</Button>
					<Button className="w-64" onClick={handleClickOpenRDel} variant="contained" color="error">Request account deletion</Button>
					<Button variant="contained" color="error">Logout</Button>
					</div>
			 </Box>
		</Box>
		<ChangePasswordDialog open={openPw} onClose={handleClosePw} />
		<ConfirmationDialog head="Suspend Service Temporarily" body={"This would temporarily suspend our services for your store. Your store will be marked closed and won't appear in any search results or recommendations list for users. But your data will remain intact in our databases. Agree to continue?"} open={openSus} onClose={handleCloseSus} />
		<ConfirmationDialog head="Request Account Deletion" body={"This queues your request to permanently discontinue our services for your store. Your account would be removed from all our databases and platforms. Once agreed, this action cannot be undone. Agree to continue?"} open={openRDel} onClose={handleCloseRDel} />
		</>
	);
}
export const ChangePasswordDialog=({open, onClose})=>{
	return(
		<Dialog fullWidth open={open} onClose={onClose}>
			<Grow in={open}>
			<Box>
				<ValidatorForm>
					<DialogTitle className="font-bold">Change Password</DialogTitle>
					<DialogContent>
						<div className="flex flex-col space-y-4">
							<TextField required label="Old Password" type="text" variant="standard" />
							<TextField required label="New Password" type="text" variant="standard" />
							<TextField required label="Retype new Password" type="text" variant="standard" />
						</div>
					</DialogContent>
					<DialogActions className="flex items-center mt-10 space-x-2">
						<Button onClick={onClose}>Cancel</Button>
						<Button type="submit">Update Password</Button>
					</DialogActions>
				</ValidatorForm>
			</Box>
			</Grow>
		</Dialog>
	)
}

export const ConfirmationDialog=({head, body, open, onClose})=>{
	return(
		<Dialog fullWidth open={open} onClose={onClose}>
			<Grow in={open}>
			<Box>
				<DialogTitle className="font-bold">{head}</DialogTitle>
				<DialogContent>
					{body}
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