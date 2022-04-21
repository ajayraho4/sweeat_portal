import { createContext, useContext as useReactContext } from 'react';
export const SweeatsContext = createContext({})

export const useContext=()=>{
	const reactContext = useReactContext(SweeatsContext);
	if(typeof(reactContext.data) === 'undefined'){
		console.log("[Context] undefined", reactContext)
		return {name:undefined}
	} else {
		console.log("[Context] defined", reactContext)
		return reactContext.data
	}
}
export const useSetContext=(data)=>{
	const reactContext = useReactContext(SweeatsContext);
	return reactContext.data// = data
}