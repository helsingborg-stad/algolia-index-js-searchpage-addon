<li class="c-pagination__item">
    @button([
        'style' => 'filled',
        'size' => 'sm',
        'color' => '{ALGOLIA_JS_PAGINATION_COLOR}',
        'href' => '{ALGOLIA_JS_PAGINATION_HREF}',
        'classList' => [
            'c-pagination__link',
            '{ALGOLIA_JS_PAGINATION_CLASS}' ? : ''
        ],
        'attributeList' => [
            'data-value' => '{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}'
        ],
        'text' => '{ALGOLIA_JS_PAGINATION_TEXT}'
    ])
    @endbutton
</li>