<?php

namespace AlgoliaIndexJsSearchpage\UI;

use AlgoliaIndexJsSearchpage\Blade\Blade;
use AlgoliaIndexJsSearchpage\Helper\IsSearchPage;
use AlgoliaIndexJsSearchpage\Helper\Lang;
use Municipio\Helper\Notice;

class Render implements RenderInterface
{
    private static $hasRenderedSearchPage = false;

    public function __construct(
        private Blade $blade,
    ) {}

    /**
     * Render the search page.
     *
     * @return void
     */
    public function renderSearchPage()
    {
        if (!$this->shouldRenderSearchPage()) {
            return;
        }

        echo
            $this->blade->render(
                'search-page',
                [
                    'lang' => Lang::getLang(),
                    'enableFacets' => $this->enableFacets(),
                    'templates' => $this->getFilesInTemplateDirectory('templates', true),
                    'facetingEnabled' => apply_filters('AlgoliaIndex/FacetingEnabled', true),
                ],
                true,
                [ALGOLIAINDEXJSSEARCHPAGE_VIEW_PATH],
            )
        ;

        self::$hasRenderedSearchPage = true;
    }

    /**
     * Determine if facets should be enabled.
     *
     * @return bool
     */
    private function enableFacets(): bool
    {
        $facets = get_field('algolia_index_facetting', 'options');
        if (!empty($facets) && is_array($facets)) {
            $facetsEnabled = array_filter($facets, function ($facet) {
                return $facet['enabled'] == true;
            });
            return !empty($facetsEnabled);
        }
        return false;
    }

    /**
     * Get all files in template directory.
     *
     * @param string $directory
     * @param bool $templateNames If true, format file names to blade template names.
     * @return array
     */
    private function getFilesInTemplateDirectory(string $directory, $templateNames = false): array
    {
        $files = [];
        $fullPath = ALGOLIAINDEXJSSEARCHPAGE_VIEW_PATH . $directory;

        if (is_dir($fullPath)) {
            $dirHandle = opendir($fullPath);
            if ($dirHandle) {
                while (($file = readdir($dirHandle)) !== false) {
                    if ($file !== '.' && $file !== '..' && is_file($fullPath . '/' . $file)) {
                        $files[] = $directory . '/' . $file;
                    }
                }
                closedir($dirHandle);
            }
        }

        //Format to blade template names
        if ($templateNames) {
            $files = array_map(function ($filePath) {
                $bladePath = str_replace('/', '.', $filePath);
                $bladePath = preg_replace('/\.blade\.php$/', '', $bladePath);
                return $bladePath;
            }, $files);
        }

        return $files;
    }

    /**
     * Determine if the search page should be rendered.
     *
     * @return bool
     */
    private function shouldRenderSearchPage(): bool
    {
        return !self::$hasRenderedSearchPage && IsSearchPage::isSearchPage();
    }
}
