<?php 
    $nombre = array("Pack de 6 estropajos salvauñas de fibra verde",
    "Pack de 12 piedra pómez limpiamanchas",
    "Caja de 3 bobinas film auto-adherente 250 mt - 30 cm",
    "Barra de minusvalía ABATIBLE 805 mm.",
    "Bolsas PEAD translúcidas",
    "Carros plegables para recogida de ropa ECO-VANEX",
    "Limpiador higienizante LUBACIN A-SEOS",
    "Accesorios equipos de fregado ECO-VANEX",
    "Aplicador 40 cm DEWATER con nebulizador",
    "Dosificador de gel 900 cc ABS Metalizado Mod. EUROTEC");
    foreach ($nombre as $x => $value) {
        $y = 0;
        $i = 0;
        do {
            $_POST['name'] = $value." ".$i;
            $result = product_validator_php();

            if ($result['result']) {
                $category_random = $categories[array_rand($categories)];
                $subcategories = select_subcategories($category_random['id']);
                $subcategory_random = $subcategories[array_rand($subcategories)];
                $sale_price = (random_int(201,500) / 10);
                $purchase_price = (random_int(1,200) / 10);
                $insert_end = array(
                    'name' => $_POST['name'],
                    'description' => "orem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de.",
                    'stock' => (random_int(0, 999)),
                    'purchase_price' => $purchase_price,
                    'sale_price' => $sale_price,
                    'gain' => $sale_price - $purchase_price,
                    'img' => "/nueva_final/module/client/module/products/view/img/".$x.".jpg",
                    'provider' => "other",
                    'category' => $category_random['id'],
                    'subcategory' => $subcategory_random['id'],
                    'clicks' => 0
                );
                insert($insert_end);
                $y++;
            } else {
                $i++;
            };
        } while($y != 3);
    };
?>