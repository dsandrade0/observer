let Commons = {
	server: 'localhost',
	port: '8080',
};
export default Commons;

let xfetch = (url: string, data: object, method: string, type: string) => {
	if (!type) {
		type = 'application/json';
	}

	if (method === 'get') {
		console.log('get request');
		return fetch('http://'+Commons.server+':'+Commons.port+url, 
			{
				method: method,
				headers: new Headers({'content-type': type})
			});
	}
	
	console.log('request '+ method);
	return fetch('http://'+Commons.server+':'+Commons.port+url, 
		{
			body: JSON.stringify(data),
			method: method,
			headers: new Headers({'content-type': type})
		});
}

export {xfetch};

