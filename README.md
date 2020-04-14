# Goldeimer web apps staging env

Dockerized local / staging env.

### Database Dumps

The `sql/` directory is expected to contain the following two database dumps,
prior to running `up.sh`:

- `jtl.sql`
- `wordpress.sql`

`*.sql` dumps are to be omitted from version control (see `.gitignore`).

### Static Production Content

Prior to first run, static production content must be copied to the local or
staging environment. `sync-prod-content.sh` mounts the webroot as an `sshfs`
mountpoint and thereafter `rsync`s it with a vcs-exempted directory in the
project root.

### Secrets

The `./secrets` directory is expected to contain the following EOL-terminated
one-line text files:

- `secret_jtl_db_name.txt`
- `secret_jtl_db_password.txt`
- `secret_jtl_db_user.txt`
- `secret_remote_webroot_abspath.txt`
- `secret_wordpress_db_name.txt`
- `secret_wordpress_db_password.txt`
- `secret_wordpress_db_user.txt`
- `secret_wordpress_table_prefix.txt`

These files are to be prefixed by `secret_` and to be omitted from version
control (see `.gitignore`).
