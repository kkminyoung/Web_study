<!DOCTYPE html>
<html>

<head>
    <title>Bob's Auto Parts - Order Results</title>
</head>

<body>
    <h1>Bob's Auto Parts</h1>
    <h2>Order Results</h2>

    <?php
    echo '<p>Order processed.</p>';

    // 시간
    echo date('H:i, jS F Y');
    echo "</p>";

    // 물품별 수량
    $tireqty = $_POST['tireqty'];
    $oilqty = $_POST['oilqty'];
    $sparkqty = $_POST['sparkqty'];
    echo '<p>Your order is as follows: </p>';
    echo htmlspecialchars($tireqty) . ' tires<br>';
    echo htmlspecialchars($oilqty) . ' bottls of oil<br>';
    echo htmlspecialchars($sparkqty) . ' spark plugs<br>';

    // 총 수량계산
    $totalqty = 0;
    $totalqty = $tireqty + $oilqty + $sparkqty;
    echo "<p>Items ordered: " . $totalqty . "<br>";

    // 물품별 가격 지정
    define('TIREPRICE', 100);
    define('OILPRICE', 10);
    define('SPARKPRICE', 4);

    // 총 가격계산
    $totalamount = 0.00;
    $totalamount = $tireqty * TIREPRICE + $oilqty * OILPRICE + $sparkqty * SPARKPRICE;
    echo "Subtotal: $" . number_format($totalamount, 2) . "<br>";

    // 세금 부여
    $taxrate = 0.10;
    $totalamount = $totalamount * (1 + $taxrate);
    echo "Total including tax: $" . number_format($totalamount, 2) . "</p>";

    if ($find == "a") {
        echo "<p>Regular customer.</p>";
    } elseif ($find == "b") {
    
    } elseif ($find == "c") {
    
    }else {
    
    }
    

    $_SERVER["DOCUMENT_ROOT"] = "/xampp/htdocs";
    $document_root = $_SERVER["DOCUMENT_ROOT"]; 
    $fp = fopen("$document_root/orders.txt", 'a');
    $output = $date.' '.$tireqty.' tires '.$oilqty.' oil '.$sparkqty.' spark plugs $'.$totalamount.' '.$address.PHP_EOL;
    fwrite($fp, $output, strlen($output));
    ?>
</body>

</html>