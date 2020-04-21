<?php

namespace AlgoliaIndexJsSearchpage;

class App
{
    public function __construct()
    {
        
        add_action('wp_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueScripts'));
        add_action('get_search_form', array($this, 'renderSearchpageMount'));
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        wp_enqueue_style('algolia-index-js-searchpage-css', 'https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css'); 
        //wp_register_style('', ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('js/app.css'));
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        wp_enqueue_script('algolia-index-js-searchpage-js', ALGOLIAINDEXJSSEARCHPAGE_URL . '/assets/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('js/app.js'));
        //wp_enqueue_script('algolia-index-js-searchpage-js'); 
    }

    public function renderSearchpageMount($query) {
        global $renderedSearch; 
        if(!isset($renderedSearch)) {
            $renderedSearch = true; 
            echo '<div id="algolia-instantsearch-react"></div>'; 
        }
    }
}
