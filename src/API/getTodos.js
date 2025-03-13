import API from "./api"

const getTodos = async () => {
    const {data} = await API.get('/todos')
    return data;

}
export default getTodos;