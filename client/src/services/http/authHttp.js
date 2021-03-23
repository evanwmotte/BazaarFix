import http from './index'

export const createUser = async (createdUser) => {

	try {
		const response = await http.post("/users/signup", { user: createdUser });
		const {
			data: { user },
		} = response;
		return user;
	} catch (error) {
		return error.response.data
	}
};

export const login = async (loginUser) => {
	try {
		const response = await http.post("/users/login", { user: loginUser });
		const {
			data: { user },
		} = response;
		return user;
	} catch (error) {
		return error.response.data
	}
};