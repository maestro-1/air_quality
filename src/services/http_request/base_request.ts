import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const instanceType = axios.create();
type httpRequest = typeof instanceType | typeof axios;

interface RequestObj {
	[index: string]: any;
}

/*
* @baseUrl {string} the base domain url to request with
* @secret {string} the API secret key from the payment service provide

function to handle easy configurations for axios http calls,
and returns an axios instance with predefined configurations.

The instance returned can be configured further via interceptors and used
anywhere in the application
*/
export const requestHandler = (
	baseUrl: string,
) => {
	if (!baseUrl) {
		throw Error(`domain name cannot be undefined`);
	}
	const instance = axios.create({
		baseURL: baseUrl,
	});

	// response interceptors can be reconfigured because axios instance is returned
	instance.interceptors.response.use(
		(response) => response,
		(err) => err
	);

	return instance;
};



export const  base_request_instance = requestHandler(
	process.env.IQAIR
);