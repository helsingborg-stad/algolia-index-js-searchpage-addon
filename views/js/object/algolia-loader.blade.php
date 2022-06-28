<div>
    @for ($i = 0; $i < 10; $i++)
        @card([
            "heading" => '<span class="u-preloader u-display--block" style="width: 200px;">Loading</span>',
            "content" => '<span class="u-preloader u-display--block" style="width: 100%; height: 80px;">Loading</span>',
            "classList" => ['u-margin__bottom--4']
        ])
        @endcard
    @endfor
</div>