<div class="container">
  <div class="search-panel">
    <div class="search-panel__results">
      <div id="searchbox">

        @field([
            'id' => 'searchBoxField',
            'type' => 'text',
            'attributeList' => [
                'type' => 'search',
                'name' => 'search',
                'required' => true,
            ],
            'label' => "Vad letar du efter?",
            'icon' => ['icon' => 'search']
        ])
        @endfield


      </div>
      <div class="o-grid">
          <div id="hits"></div>
      </div>
      <div id="pagination"></div>
    </div>
  </div>
</div>