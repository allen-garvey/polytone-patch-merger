<?php

$is_single_file = array_key_exists(1, $argv) && $argv[1] === '--single-file';
$current_directory = dirname(__FILE__);

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Polytone Patch Merger</title>
        <meta
            name="description"
            content="Do you love Reason's Polytone Dual-Layer Synthesizer but wish you could combine two existing patches (presets)? This tool allows you to do just that. Just open two patches, select a source for layer A, layer B, and the global parameters, and export your brand new patch!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <?php if($is_single_file): 
            echo '<style>'.file_get_contents($current_directory.'/public/assets/style.css').'</style>';
        ?>
        <?php else: ?>
            <link rel="stylesheet" type="text/css" href="/assets/style.css" />
        <?php endif; ?>
    </head>
    <body>
        <nav class="nav">
            <ul>
                <li>
                    <a href="https://reason.pluginista.com"
                        >Reason Sound Pack Viewer</a
                    >
                </li>
                <li>
                    <a
                        href="https://github.com/allen-garvey/polytone-patch-merger"
                        >Source on GitHub</a
                    >
                </li>
            </ul>
        </nav>
        <h1>Polytone Patch Merger</h1>
        <p>
            Do you love
            <a href="https://www.reasonstudios.com/devices/polytone"
                >Reason's Polytone Dual-Layer Synthesizer</a
            >
            but wish you could combine two existing patches (presets)? This tool
            allows you to do just that. Just open two patches, select a source
            for layer A, layer B, and the global parameters, and export your
            brand new patch!
        </p>

        <?php if(!$is_single_file): ?>
            <p>
                <a href="/polytone-patch-merger.html" download
                    >Click to download a single-file version to use offline</a
                >
            </p>
        <?php endif; ?>

        <div id="app"></div>
        <?php if($is_single_file): 
            echo '<script>'.file_get_contents($current_directory.'/public/assets/app.js').'</script>';
        ?>
        <?php else: ?>
            <script src="/assets/app.js"></script>
        <?php endif; ?>
    </body>
</html>
