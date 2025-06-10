@element([
    'attributeList' => [
        'data-js-search-page-pagination' => true
    ],
    'classList' => [
        'c-pagination',
        'u-margin__x--auto',
        'u-margin__bottom--4'
    ]
])
    @include('partials.pagination-item')
    @include('partials.pagination-icon')
@endelement