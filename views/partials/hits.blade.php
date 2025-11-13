<!-- Hits -->
@element([
    'attributeList' => [
        'data-js-search-page-hits' => true
    ],
    'classList' => [
        'o-layout-grid',
        'o-layout-grid--col-span-9',
        'o-layout-grid--gap-8'
    ]
])
    @include('partials.hits-loader')
@endelement