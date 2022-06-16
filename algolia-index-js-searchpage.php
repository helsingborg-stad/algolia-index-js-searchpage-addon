<?php

/**
 * Plugin Name:       Algolia Index Js Search Page
 * Plugin URI:        (#plugin_url#)
 * Description:       Replaces search page with a js (instant search) page.
 * Version:           1.0.0
 * Author:            Sebastian Thulin
 * Author URI:        (#plugin_author_url#)
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       algolia-index-js-searchpage
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('ALGOLIAINDEXJSSEARCHPAGE_PATH', plugin_dir_path(__FILE__));
define('ALGOLIAINDEXJSSEARCHPAGE_URL', plugins_url('', __FILE__));
define('ALGOLIAINDEXJSSEARCHPAGE_TEMPLATE_PATH', ALGOLIAINDEXJSSEARCHPAGE_PATH . 'templates/');
define('ALGOLIA_INDEX_MOUNT_POINT', 'custom_search_page');

load_plugin_textdomain('algolia-index-js-searchpage', false, plugin_basename(dirname(__FILE__)) . '/languages');

require_once ALGOLIAINDEXJSSEARCHPAGE_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once ALGOLIAINDEXJSSEARCHPAGE_PATH . 'Public.php';

// Instantiate and register the autoloader
$loader = new AlgoliaIndexJsSearchpage\Vendor\Psr4ClassLoader();
$loader->addPrefix('AlgoliaIndexJsSearchpage', ALGOLIAINDEXJSSEARCHPAGE_PATH);
$loader->addPrefix('AlgoliaIndexJsSearchpage', ALGOLIAINDEXJSSEARCHPAGE_PATH . 'source/php/');
$loader->register();

// Start application
new AlgoliaIndexJsSearchpage\App();
