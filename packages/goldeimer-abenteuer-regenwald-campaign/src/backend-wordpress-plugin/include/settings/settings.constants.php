<?php

const PAGE_SLUG = 'abenteuer-regenwald'

const SETTINGS = [
    'abenteuerRegenwald': [
        'slug' => PAGE_SLUG,
        'sections' => [
            'main' => [
                'slug' => PAGE_SLUG . '-section-main',
                'fields' => [
                    'treeCount' => [
                        'slug' => 'tree-count',
                        'defaultValue' => 0
                    ]
                ]
            ]
        ]
    ]
]
