# Kanshi.js

Simple script for monitoring websites.

## Installation

	  $ npm install kanshi

## Usage

### Start

	  $ node node_modules/kanshi/kanshi.js

  Like a daemon

	  $ nohup node node_modules/kanshi/kanshi.js &

### Monitor

	  http://localhost:3000/ 

### Configure

  Please edit

    node_modules/kanshi/targets.js

  Symbolic link for accessing log files from browser

    ln -s ../logs node_modules/kanshi/statics/logs

## Demo

  login with test/test

http://kanshi.looseleafjs.org/

