<?php

/**
 * Plugin Name:       Algolia Index Js Search Page
 * Plugin URI:        (#plugin_url#)
 * Description:       Replaces search page with a js (instant search) page.
 * Version: 3.6.4
 * Author:            Sebastian Thulin
 * Author URI:        (#plugin_author_url#)
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       algolia-index-js-searchpage
 * Domain Path:       /languages
 */

use AlgoliaIndexJsSearchpage\Blade\Blade;
use AlgoliaIndexJsSearchpage\UI\Render;
use ComponentLibrary\Init as ComponentLibraryInit;
use WpService\Implementations\NativeWpService;
use WpUtilService\WpUtilService;

if (!defined('WPINC')) {
    die();
}

define('ALGOLIAINDEXJSSEARCHPAGE_PATH', plugin_dir_path(__FILE__));
define('ALGOLIAINDEXJSSEARCHPAGE_URL', plugins_url('', __FILE__));
define('ALGOLIAINDEXJSSEARCHPAGE_VIEW_PATH', ALGOLIAINDEXJSSEARCHPAGE_PATH . 'views/');

// Autoload from plugin
if (file_exists(ALGOLIAINDEXJSSEARCHPAGE_PATH . 'vendor/autoload.php')) {
    require_once ALGOLIAINDEXJSSEARCHPAGE_PATH . 'vendor/autoload.php';
}

require_once ALGOLIAINDEXJSSEARCHPAGE_PATH . 'Public.php';

add_action('init', function () {
    load_plugin_textdomain('algolia-index-js-searchpage', false, plugin_basename(dirname(__FILE__)) . '/languages');
});

// Start application
$wpService = new NativeWpService();
$wpUtilService = new WpUtilService($wpService);

// Start application
new AlgoliaIndexJsSearchpage\App($wpUtilService->enqueue(__DIR__), new Render(new Blade(new ComponentLibraryInit([]))));
