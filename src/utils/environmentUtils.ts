export const getApiUrl = () => {
    console.log(process.env.BACKEND_URL)
    return `http://localhost:8080`;
}