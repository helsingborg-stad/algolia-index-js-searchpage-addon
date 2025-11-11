<!-- searchfield -->
@element([
    'attributeList' => [
        'data-js-search-page-search-container' => true
    ],
    'classList' => [
        'u-display--flex',
        'u-gridgap--4'
    ]
])
    @field([
        'classList' => [
            'c-paper',
        ],
        'attributeList' => [
            'data-js-search-page-search-input' => true,
            'aria-label' => $lang['algoliaSearchPlaceholder']
        ],
        'type' => 'text',
        'type' => 'search',
        'name' => 'search',
        'required' => true,
        'label' => false,
        'icon' => ['icon' => 'search']
    ])
    @endfield

    @button([
        'id' => 'search-page__filter-button',
        'text' => 'Filter',
        'color' => 'default',
        'style' => 'basic',
        'icon' => 'filter_alt',
        'reversePositions' => true,
        'classList' => [
            'u-margin__left--4',
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

@endelement

