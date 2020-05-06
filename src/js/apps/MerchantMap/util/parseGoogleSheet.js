import Papa from 'papaparse';


const parseGoogleSheet = async (url) =>
{
    const parseFile = (url) =>
    {
        return new Promise(
            (resolve) => {
                Papa.parse(
                    url,
                    {
                        download: true,
                        header: true,
                        complete: (results) => {
                            resolve(results.data);
                        },
                    }
                );
            }
        );
    };

    return await parseFile(url);
}


export default parseGoogleSheet
