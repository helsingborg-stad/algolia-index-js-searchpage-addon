<?php

namespace AlgoliaIndexJsSearchpage;

class ComponentsJs
{
    private $components = [];
    private $lang = [];
    private $viewPath   = ALGOLIAINDEXJSSEARCHPAGE_VIEW_PATH . 'js/object/';

    public function __construct()
    {
        $this->lang = [
            'noresults' => __('No search results found on your query', 'algolia-index-js-searchpage')
        ];

        add_action('init', array($this, 'createComponents'));
        add_action('wp_enqueue_scripts', array($this, 'renderComponents'), 50);
    }

    /**
     * Send data to frontend application
     *
     * @return void
     */
    public function renderComponents() //:void
    {
        wp_localize_script(
            'algolia-index-js-searchpage',
            'algoliaSearchComponents',
            $this->components
        );
    }

    /**
     * Fetch components from js view path
     *
     * @return void
     */
    public function createComponents() //:void
    {
        $viewFiles = glob($this->viewPath . '*.blade.php');

        if (is_array($viewFiles) && !empty($viewFiles)) {
            foreach ($viewFiles as $view) {
                $this->components[$this->getKey($view)] = (object) [
                    'key' => $this->getKey($view),
                    'html' => $this->renderView(
                        $view,
                        ['lang' => (object) $this->lang]
                    )
                ];
            }
        }
    }

    /**
     * Create a js-object friendly name of the view
     *
     * @param string $view
     * @return string
     */
    private function getKey(string $view): string
    {
        return str_replace(
            ".blade.php",
            "",
            basename($view)
        );
    }

    /**
     * Render blade view
     *
     * @param string  $view       The view path
     * @param array   $data       Data required to render view (default: [])
     * @param boolean $compress   If true, compress the output (default: true)
     * @return string
     */
    private function renderView(string $view, array $data = [], bool $compress = true): string
    {
        if (function_exists('algolia_search_page_render_blade_view')) {
            return algolia_search_page_render_blade_view(
                $this->sanitizeViewPath($view),
                $data,
                $compress
            );
        }

        throw new \RuntimeException('algolia_search_page_render_blade_view() does not exist');
    }

    /**
     * View path sanitizer
     *
     * @param string  $view   The full path
     * @return string $view   The relative path
     */
    private function sanitizeViewPath(string $view): string
    {
        return str_replace(
            ".blade.php",
            "",
            str_replace(ALGOLIAINDEXJSSEARCHPAGE_VIEW_PATH, "", $view)
        );
    }
}