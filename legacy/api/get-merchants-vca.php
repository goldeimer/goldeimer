<?

require_once('./secrets-merchants-vca.php');


/// @see [RFC 7946](https://tools.ietf.org/html/rfc7946)
function dbRowToGeoJsonFeature($row)
{
    return [
        'type' => 'Feature',
        'geometry' => [
            'type' => 'Point',
            'coordinates' => [
                $row['longitude'],
                $row['latitude'],
            ],
        ],
        'properties' => [
            'brands' => ['vca'],
            'city' => $row['city'],
            'country' => $row['country'],
            'merchantTypes' => ['retail'],
            'name' => $row['name'],
            'street' => $row['street'],
            'url' => $row['url'],
        ],
    ];
}


function dbResultToGeoJson($result)
{
    return [
        'type' => 'FeatureCollection',
        'features' => array_map('dbRowToGeoJsonFeature', $result)
    ];
}


function queryVcaDb()
{
    try
    {
        $dbh = new PDO(
            DB_VCA_DATA_SOURCE_NAME,
            DB_VCA_USER,
            DB_VCA_PASS,
            [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]
        );
    }
    catch (Exception $e)
    {
        print(
            sprintf(
                "Error establishing database connection: %s",
                $e->getMessage()
            )
        );

        die();
    }

    $pdoStatement = $dbh->prepare(
        "SELECT name, street, city, country, url, x(location) latitude, y(location) longitude from haendler"
    );

    $pdoStatement->execute();

    return $pdoStatement->fetchAll(PDO::FETCH_ASSOC);
}


header('Content-Type: application/json');

echo json_encode(
    dbResultToGeoJson(
        queryVcaDb()
    )
);
