@element([
    'componentElement' => 'template',
    'attributeList' => [
        'data-js-search-hit-template' => true
    ],
])
  @card([
    "heading"   => "{SEARCH_JS_HIT_HEADING}",
    "meta"      => "{SEARCH_JS_HIT_SUBHEADING}",
    "content"   => "{SEARCH_JS_HIT_EXCERPT}",
    "image"     => [
      'src' => '{SEARCH_JS_HIT_IMAGE_URL}', 
      'alt' => '{SEARCH_JS_HIT_IMAGE_ALT}'
    ],
    "link"      => "{SEARCH_JS_HIT_LINK}",
    "classList" => ['c-card--size-md']
  ])
  @endcard
@endelement