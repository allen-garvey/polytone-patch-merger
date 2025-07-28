<?php

$current_directory = dirname(__FILE__);

$index = file_get_contents($current_directory.'/public/index.html');
$js = file_get_contents($current_directory.'/public/assets/app.js');
$css = file_get_contents($current_directory.'/public/assets/style.css');

echo str_replace('<script src="/assets/app.js"></script>', '<script>'.$js.'</script>', str_replace('<link rel="stylesheet" type="text/css" href="/assets/style.css"/>', '<style>'.$css.'</style>', $index));