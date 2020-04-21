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
