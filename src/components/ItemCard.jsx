import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
export default function ItemCard({id, name, price, rating, image, available, editButtonHandler, deleteButtonHandler}) {
	return (
		<Card sx={{ width: 300 }}>
			<CardMedia
				component="img"
				height="80"
				className="h-32"
				image={image}
				alt={name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{name}
				</Typography>
				<div className="flex"><Typography variant="body2" color="text.secondary" className="truncate w-1/2">
					Price: <span className="text-black">₹{price}</span>
				</Typography>
				<Typography variant="body2" className="truncate w-1/2" color="text.secondary">
					Rating: <span className="text-black">{rating}</span> / 5
				</Typography></div>
			</CardContent>
			<CardActions className="flex justify-end px-2 -mt-4">
				<Tooltip title="Edit this item">
					<IconButton onClick={()=>editButtonHandler({id, name, price, available, rating})}>
						<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20" viewBox="0 0 24 24" width="20"><g><rect fill="none" height="24" width="24"/></g><g><g><g><polygon points="3,17.25 3,21 6.75,21 17.81,9.94 14.06,6.19"/></g><g><path d="M20.71,5.63l-2.34-2.34c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83C21.1,6.65,21.1,6.02,20.71,5.63z"/></g></g></g></svg>
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete this item">
					<IconButton onClick={()=>deleteButtonHandler({id, name, price, available, rating})} color="error">
						<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
					</IconButton>
				</Tooltip>
			</CardActions>
		</Card>
	);
}