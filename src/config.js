class config {
  endpoint = "http://localhost:3000";
  loginRoute = this.endpoint + "/auth/login";
  registerRoute = this.endpoint + "/user/postUser";
}

const configInstance = new config();

export default configInstance;
