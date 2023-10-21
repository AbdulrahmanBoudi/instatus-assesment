import axios, { AxiosInstance } from "axios";

class Client {
  clientInstance: AxiosInstance;
  constructor() {
    this.clientInstance = axios.create({
      baseURL: "https://assessment-api-bmjl.onrender.com/",
    });
  }

  get = (args: { url: string; data?: any }) => {
    return this.clientInstance.get(args.url, args.data);
  };

  post = (args: { url: string; data?: any }) => {
    return this.clientInstance.post(args.url, args.data);
  };

  put = (args: { url: string; data?: any }) => {
    return this.clientInstance.put(args.url, args.data);
  };

  delete = (args: { url: string }) => {
    return this.clientInstance.delete(args.url);
  };
}
let client = new Client();

export default client;
