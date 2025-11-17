<!-- searchfield -->
@element([
    'id' => 'search-panel__search-container',
    'attributeList' => [
        'data-js-search-page-search-container' => true
    ]
])
    @field([
        'classList' => [
            'c-paper',
        ],
        'attributeList' => [
            'data-js-search-page-search-input' => true,
            'aria-label' => $lang['searchLabel']
        ],
        'type' => 'text',
        'type' => 'search',
        'name' => 'search',
        'required' => true,
        'label' => false,
        'icon' => ['icon' => 'search']
    ])
    @endfield

    @if($facetingEnabled)
        @button([
            'id' => 'search-page__filter-button',
            'text' => $lang['openFilters'],
            'color' => 'default',
            'style' => 'basic',
            'icon' => 'filter_alt',
            'reversePositions' => true,
            'classList' => [
                'u-display--none@md',
                'u-display--none@lg',
                'u-display--none@xl'
            ],
            'attributeList' => [
                'data-js-toggle-trigger' => 'search-page-facets',
                'aria-pressed' => 'false',
            ]
        ])
        @endbutton
    @endif

@endelement

