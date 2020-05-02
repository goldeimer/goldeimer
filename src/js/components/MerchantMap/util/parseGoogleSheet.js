import Papa from 'papaparse';


const parseGoogleSheet = async (documentId, sheetGid) =>
{
    const url = `https://docs.google.com/spreadsheets/d/${documentId}/pub?output=csv&gid=${sheetGid}`;

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
