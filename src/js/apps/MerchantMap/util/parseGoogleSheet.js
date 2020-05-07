import Papa from 'papaparse'

const parseGoogleSheet = async (url) => {
    const parseFile = (parseUrl) => new Promise(
        (resolve) => {
            Papa.parse(
                parseUrl,
                {
                    download: true,
                    header: true,
                    complete: (results) => {
                        resolve(results.data)
                    }
                }
            )
        }
    )

    return parseFile(url)
}

export default parseGoogleSheet
