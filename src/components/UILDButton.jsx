import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function UILDButton({loading, text, ...props}){
	return(
		<>
		{ !loading ? 
			<Button {...props} type="submit">{text}</Button> :
			<Button disabled><CircularProgress size="1rem" color="secondary" /></Button>
		}
		</>
	)
}