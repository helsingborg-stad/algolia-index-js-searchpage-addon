@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-pagination-icon' => true
    ]
])
<li class="c-pagination__item">
    @button([
        'style' => 'filled',
        'size' => 'sm',
        'icon' => '{ALGOLIA_JS_PAGINATION_ICON}',
        'color' => 'default',
        'href' => '{ALGOLIA_JS_PAGINATION_HREF}',
        'classList' => [
            'c-pagination__link',
        ],
        'attributeList' => ['data-value' => '{ALGOLIA_JS_PAGINATION_PAGE_NUMBER}'],
    ])
    @endbutton
</li>
@endelement