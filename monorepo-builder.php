<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\AddTagToChangelogReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\PushNextDevReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\PushTagReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\SetCurrentMutualDependenciesReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\SetNextMutualDependenciesReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\TagVersionReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\UpdateBranchAliasReleaseWorker;
use Symplify\MonorepoBuilder\ValueObject\Option;

return static function (ContainerConfigurator $containerConfigurator): void {
    $parameters = $containerConfigurator->parameters();

    $parameters->set(
        Option::DATA_TO_REMOVE,
        [
            'require' => [
                'phpunit/phpunit' => '*',
            ],
            'minimum-stability' => 'dev',
            'prefer-stable' => true
        ]
    );

    $parameters->set(
        Option::PACKAGE_DIRECTORIES,
        [
            __DIR__ . '/etc',
            __DIR__ . '/lib',
            __DIR__ . '/packages'
        ]
    );

    $parameters->set(
        Option::DIRECTORIES_TO_REPOSITORIES,
        [
            'etc/infrastructure/wordpress/wp-install'
                => 'git@github.com:goldeimer/wp-install.git',
            'lib/php-util'
                => 'git@github.com:goldeimer/php-util.git',
            'lib/wp-util'
                => 'git@github.com:goldeimer/wp-util.git',
            // 'packages/toilet-paper-calculator'
            //     => 'git@github.com:goldeimer/wp-toilet-paper-calculator.git',
            'packages/wp-theme-goldeimer'
                => 'git@github.com:goldeimer/wp-theme-goldeimer.git'
        ]
    );

    $services = $containerConfigurator->services();

    $services->set(SetCurrentMutualDependenciesReleaseWorker::class);
    $services->set(AddTagToChangelogReleaseWorker::class);
    $services->set(TagVersionReleaseWorker::class);
    $services->set(PushTagReleaseWorker::class);
    $services->set(SetNextMutualDependenciesReleaseWorker::class);
    $services->set(UpdateBranchAliasReleaseWorker::class);
    $services->set(PushNextDevReleaseWorker::class);
};
