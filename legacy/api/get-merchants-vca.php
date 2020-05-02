<?

require_once('./secrets-merchants-vca.php');

try
{
    $dbh = new PDO(
        DB_VCA_DATA_SOURCE_NAME,
        DB_VCA_USER,
        DB_VCA_PASS,
        array(
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
        )
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

$sql = $dbh->prepare(
    "SELECT name, street, city, country, url, x(location) latitude, y(location) longitude from haendler"
);

$sql->execute();

header('Content-Type: application/json');

echo json_encode(
    $sql->fetchAll(PDO::FETCH_ASSOC)
);
