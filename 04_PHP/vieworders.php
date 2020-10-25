<!DOCTYPE html>
<html>

<head>
    <title>Bob's Auto Parts - Order Results</title>
</head>

<body>
    <h1>Bob's Auto Parts</h1>
    <h2>Order Results</h2>
    <?php
    $_SERVER["DOCUMENT_ROOT"] = "/xampp/htdocs";
    $document_root = $_SERVER["DOCUMENT_ROOT"]; 
    $fp = fopen("$document_root/orders.txt", 'r');
    
    flock($fp, LOCK_SH); // lock file for reading

    if (!$fp) {
        echo "<p><strong>No orders pending.<br />
              Please try again later.</strong></p>";
        exit;
    }
    while (!feof($fp)) {
        $order = fgets($fp);
        echo htmlspecialchars($order) . "<br />";
    }
    fclose($fp);
    ?>
</body>

</html>