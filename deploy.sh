#!/bin/bash
 
rm -fr /home/tic/visor-mprgc
 
cp -r tmp /home/tic/visor-mprgc
 
mkdir -p /var/www/html/visor-mprgc
rm -fr /var/www/html/visor-mprgc/*
cp -r /home/tic/visor-mprgc/public/*  /var/www/html/visor-mprgc/