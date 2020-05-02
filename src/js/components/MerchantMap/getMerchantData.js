import axios from 'axios';


const ENDPOINT_URL_VCA = 'https://www.goldeimer.de/api/merchants';


const getMerchantData = async () =>
{
    try
    {
        const response = await axios.get(ENDPOINT_URL_VCA);

        return response.data;
    }
    catch (error)
    {
        console.log(error);

        return [];
    }
}


export default getMerchantData;
