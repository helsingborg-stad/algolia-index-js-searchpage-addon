@element([
    'attributeList' => [
        'data-js-search-page-hits' => true
    ],
    'classList' => [
        'u-display--flex',
        'u-flex--gridgap',
        'u-flex-direction--column',
        'unlist'
    ]
])
    @include('partials.loader')
    @include('partials.noresult')
@endelement