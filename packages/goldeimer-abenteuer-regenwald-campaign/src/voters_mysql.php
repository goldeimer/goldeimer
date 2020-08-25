
<?php
include "config.php";
$result = $conn->query("SELECT * FROM voters");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"Name":"'  . $rs["voters"] . '",';
  $outp .= '"Country":"'. $rs["votingdate"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>
