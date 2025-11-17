<!-- Hits -->
@element([
    'id' => 'search-panel__hits',
    'attributeList' => [
        'data-js-search-page-hits' => true
    ]
])
    @include('partials.hits-loader')
@endelement