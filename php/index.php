<?php
if (isset($_GET["file"])) {
  include_once $_GET["file"];
} ?>

Hello, <?php echo isset($_GET["name"]) ? $_GET["name"] : "World"; ?>!
