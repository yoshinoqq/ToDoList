import axios from "axios";
export default class TodosService {
    static async getAll(){
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        return response.data;
    }
}