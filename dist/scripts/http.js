export default class HttpClient {
	#url = '';
	constructor(url) {
		this.#url = url;
	}
	async get() {
		try {
			const response = await fetch(this.#url);
			if (response.ok) {
				const result = await response.json();
				return result;
			} else {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			throw new Error(`An error occurred in the get method: ${error}`);
		}
	}
	async add(data) {
		try {
			const response = await fetch(this.#url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				const result = await response.json();
				return result;
			} else {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			throw new Error(`An error occurred in the add method: ${error}`);
		}
	}
	async delete() {
		try {
			const response = await fetch(this.#url, {
				method: 'DELETE',
			});
		} catch (error) {
			throw new Error(`An error occurred in the delete method: ${error}`);
		}
	}
	async update(data) {
		try {
			const response = await fetch(this.#url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				const result = await response.json();
				return result;
			} else {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			throw new Error(`An error occurred in the update method: ${error}`);
		}
	}
}
