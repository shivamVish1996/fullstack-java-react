import {toast} from 'react-toastify';

const successConfig = {
	position: toast.POSITION.TOP_CENTER,
	draggable: false,
	autoClose: 3500,
	className:"font15"
}

const errorConfig = {
	position: toast.POSITION.TOP_CENTER,
	draggable: false,
	autoClose: false,
	className:"font15"
}

export default successConfig;
export {errorConfig};