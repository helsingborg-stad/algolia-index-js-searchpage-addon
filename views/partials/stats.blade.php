@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-stats' => true
    ]
])
    @typography([
        'variant' => 'p',
        'element' => 'p',
        'classList' => ['u-text-small']

    ])
    {{$lang['algoliaStats']}}
    @endtypography
@endelement