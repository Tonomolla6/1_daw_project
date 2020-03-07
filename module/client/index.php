<!DOCTYPE html>
    <head>
        <?php 
            include("module/client/view/inc/head.html"); 
            include("module/client/module/".$_GET['page']."/view/head.html"); 
        ?>
    </head>

    <body>
        <div id="menu">
            <?php include("module/client/view/inc/menu.html"); ?>
        </div>

        <div id="content">
            <?php include("module/client/view/inc/pages.php"); ?>
        </div>

        <div id="footer">
            <?php include("module/client/view/inc/footer.html"); ?>
        </div>
    </body>
</html>