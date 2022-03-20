const info = (...params) => {
	console.log(...params);
}
const error = (...param) =>{
	console.log("error", ...param);
}

export default {error, info}
