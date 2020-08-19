
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host ="localhost";
$user = "root";
$password = "";
$db = "voters";

$conn = new mysqli($host, $user, $password, $db);

if (!$conn){
  die ('Keine Verbindung möglich : '.mysqli_connect_error());
}
