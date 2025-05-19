<?php

namespace AlgoliaIndexJsSearchpage\UI;

use AlgoliaIndexJsSearchpage\Blade\Blade;
use AlgoliaIndexJsSearchpage\Helper\IsSearchPage;
use AlgoliaIndexJsSearchpage\Helper\Lang;

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
                'lang' => Lang::getLang()
            ],
            true,
            [ALGOLIAINDEXJSSEARCHPAGE_VIEW_PATH]
        );

        self::$hasRenderedSearchPage = true;
    }
    
    private function shouldRenderSearchPage(): bool
    {
        return !self::$hasRenderedSearchPage && IsSearchPage::isSearchPage();
    }
}