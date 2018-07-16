#!/bin/bash
export PGPASSWORD="node_password"

echo "Configuring database: dragonstackdb"

dropdb -U node_user dragonstackdb
createdb -U node_user dragonstackdb

cd ./bin/sql

psql -U node_user dragonstackdb < ./generation.sql
psql -U node_user dragonstackdb < ./dragon.sql

echo "dragonstackdb configured"
