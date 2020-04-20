<?php

namespace AlgoliaIndexJsSearchpage;

class App
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        wp_register_style('algolia-index-js-searchpage-css', ALGOLIAINDEXJSSEARCHPAGE_URL . '/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('css/algolia-index-js-searchpage.css'));
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        wp_register_script('algolia-index-js-searchpage-js', ALGOLIAINDEXJSSEARCHPAGE_URL . '/dist/' . \AlgoliaIndexJsSearchpage\Helper\CacheBust::name('js/algolia-index-js-searchpage.js'));
    }
}
