<?php

namespace AlgoliaIndexJsSearchpage\UI;

use AlgoliaIndexJsSearchpage\Blade\Blade;
use AlgoliaIndexJsSearchpage\Helper\IsSearchPage;
use AlgoliaIndexJsSearchpage\Helper\Lang;
use Municipio\Helper\Notice;

class Render implements RenderInterface
{
    private static $hasRenderedSearchPage = false;

    public function __construct(private Blade $blade)
    {
    }

    public function renderSearchPage()
    {
        if (!$this->shouldRenderSearchPage()) {
            return;
        }
        
        echo $this->blade->render(
            'search-page',
            [
                'lang' => Lang::getLang(),
                'templates' => $this->getFilesInTemplateDirectory('templates', true)
            ],
            true,
            [ALGOLIAINDEXJSSEARCHPAGE_VIEW_PATH]
        );

        self::$hasRenderedSearchPage = true;
    }

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
    
    private function shouldRenderSearchPage(): bool
    {
        return !self::$hasRenderedSearchPage && IsSearchPage::isSearchPage();
    }
}