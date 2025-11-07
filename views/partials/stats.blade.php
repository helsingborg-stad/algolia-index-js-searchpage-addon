@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-page-stat' => true
    ]
])
    @typography([
        'variant' => 'meta',
        'element' => 'div'
    ])
    {{$lang['algoliaStats']}}
    @endtypography
@endelement

@element([
    'componentElement' => 'div',
    'attributeList' => [
        'data-js-search-page-stats' => true
    ]
])
    <!-- Loading stats... -->
@endelement