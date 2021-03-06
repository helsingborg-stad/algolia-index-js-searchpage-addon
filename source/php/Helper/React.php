<?php

namespace AlgoliaIndexJsSearchpage\Helper;

class React
{
    public static function enqueue($version = false)
    {
        // Use minified libraries if SCRIPT_DEBUG is turned off
        $suffix = (defined('DEV_MODE') && DEV_MODE) ? 'development' : 'production.min';

        $version = (is_string($version) && !empty($version)) ? $version : '16.5.2';

        //Enqueue react
        if (!wp_script_is('react')) {
            wp_enqueue_script('react', 'https://unpkg.com/react@' . $version . '/umd/react.' . $suffix . '.js', array(), null);
        }

        if (!wp_script_is('react-dom')) {
            wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@' . $version . '/umd/react-dom.' . $suffix . '.js', array('react'), null);
        }
    }
}