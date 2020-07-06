import axios from 'axios'
import Papa from 'papaparse'

const parseGoogleSheet = async (url) => {
    const response = await axios.get(url)

    return Papa.parse(Papa.unparse(response.data.values), { header: true })
}

export default parseGoogleSheet
