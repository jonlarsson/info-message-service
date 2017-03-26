#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER ims WITH PASSWORD 'evilknievel';
    CREATE DATABASE ims;
    GRANT ALL PRIVILEGES ON DATABASE ims TO ims;
EOSQL

psql -v ON_ERROR_STOP=1 --username ims <<-EOSQL
    create table services (
        id             varchar(36) primary key,
        data           jsonb not null
    );
    create table messages (
        id             varchar(36) primary key,
        data           jsonb not null
    );
    create table users (
        id             varchar(36) primary key,
        data           jsonb not null
    );
EOSQL