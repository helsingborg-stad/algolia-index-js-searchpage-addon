@element([
    'attributeList' => [
        'data-js-search-page-search-container' => true
    ],
])
    @field([
        'attributeList' => [
            'data-js-search-page-search-input' => true,
        ],
        'type' => 'text',
        'type' => 'search',
        'name' => 'search',
        'required' => true,
        'label' => $lang['searchLabel'],
        'icon' => ['icon' => 'search']
    ])
    @endfield
@endelement