export default class Common {
  static handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
