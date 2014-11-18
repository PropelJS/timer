'use strict';

var gulp = require('gulp');

var config = {
  root: __dirname,
  src: ['**/*.js', '!node_modules/**', '!docs/**'],
  watch: ['lib/**/*.js', '!node_modules/**', '!docs/**'],
  statementsThreshold: 80,
  functionsThreshold: 80,
  branchesThreshold: 75,
  linesThreshold: 80
};

require('gulp-module')(gulp, config);
