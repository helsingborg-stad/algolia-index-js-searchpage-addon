<?php

namespace AlgoliaIndexJsSearchpage;

class App
{
    
    public function __construct()
    {
        new ComponentsJs();
        add_action('wp_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueScripts'));

        add_filter('AlgoliaIndex/BackendSearchActive', '__return_false');
        add_filter('get_search_form', '__return_null');

        //Mount point & render
        add_action('plugins_loaded', function () {
            add_action(
                defined('ALGOLIA_INDEX_MOUNT_POINT') ? ALGOLIA_INDEX_MOUNT_POINT : 'get_search_form',
                array($this, 'renderSearchpageMount')
            );
        });
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        if (!self::isSearchPage()) {
            return;
        }
        wp_enqueue_style('algolia-index-js-searchpage-css', ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('css/app.css'));
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        if (!self::isSearchPage()) {
            return;
        }

        //Register & enqueue script
        wp_enqueue_script(
            'algolia-index-js-searchpage-js',
            ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('js/app.js'),
            []
        );

        //Localize script
        wp_localize_script('algolia-index-js-searchpage-js', 'algoliaTranslations', [
            'noresult' => __("No matches where found on the query", 'algolia-index-js-searchpage'),
            'filter' => __("Filter results from", 'algolia-index-js-searchpage'),
            'nposts' => __("posts found on your query.", 'algolia-index-js-searchpage'),
            'placeholder' => __("What are you looking for?", 'algolia-index-js-searchpage'),
            'submit' => __("Search", 'algolia-index-js-searchpage'),
            'facetFilterString' => __("Select origin", 'algolia-index-js-searchpage'),
        ]);

        //Get keys & indexname
        wp_localize_script('algolia-index-js-searchpage-js', 'algoliaSearchData', [
            'publicApiKey' => \AlgoliaIndex\Helper\Options::publicApiKey(),
            'applicationId' => \AlgoliaIndex\Helper\Options::applicationId(),
            'indexName' => \AlgoliaIndex\Helper\Options::indexName(),
            
        ]);

        //UI settings
        wp_localize_script('algolia-index-js-searchpage-js', 'algoliaSettings', [
            'facettingApperanceMenu' => defined('ALGOLIA_INDEX_FACETTING_APPERANCE_MENU') ? "true" : "false",
        ]);
    }

    /**
     * Print the search page mount
     *
     * @return boolean
     */
    public function renderSearchpageMount($query)
    {
        if (!self::isSearchPage()) {
            return;
        }

        global $renderedSearch;
        if (!isset($renderedSearch)) {
            $renderedSearch = true;
            echo '<div class="container">
            <div class="search-panel">
               <div class="search-panel__filters">
                <div id="dynamic-widgets"></div>
              </div> 

              <div class="search-panel__results">
                <div id="searchbox"></div>
                <div id="hits"></div>
                <div id="pagination"></div>
              </div>
            </div>
          </div>';
        }
    }

    /**
     * Check if search page is active page
     *
     * @return boolean
     */
    private static function isSearchPage()
    {

        if (is_multisite() && (defined('SUBDOMAIN_INSTALL') && SUBDOMAIN_INSTALL === false)) {
            if (trim(strtok($_SERVER["REQUEST_URI"], '?'), "/") == trim(get_blog_details()->path, "/") && is_search()) {
                return true;
            }
        }

        if (trim(strtok($_SERVER["REQUEST_URI"], '?'), "/") == "" && is_search()) {
            return true;
        }

        return false;
    }

}
