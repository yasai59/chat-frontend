class config {
  endpoint = "http://localhost:3000";
  loginRoute = this.endpoint + "/auth/login";
}

const configInstance = new config();

export default configInstance;
