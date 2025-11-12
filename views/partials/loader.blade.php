<!-- Ghostloader -->

<!-- Stats -->
@element([
    'componentElement' => 'div',
    'classList' => [
        'u-preloader',
        'u-display--block'
    ],
    'attributeList' => [
        'style' => 'width: 150px; height: 20px; margin-top: -16px;',
    ]
])
    <!-- Loading stats... -->
@endelement

@for ($i = 0; $i < 6; $i++)
    @card([
        "heading" => '<span class="u-preloader u-display--block" style="width: 200px;">Loading</span>',
        "content" => '<span class="u-preloader u-display--block" style="width: 100%; height: 80px;">Loading</span>'
    ])
    @endcard
@endfor
