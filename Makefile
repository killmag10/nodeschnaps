# Paths
PATH_TEST := test
PATH_DEPS := deps

PATH_RHINO_JAR := $(shell readlink -f $(PATH_DEPS)/rhino/js.jar)
NODESCHNAPS_PATH := $(shell readlink -f lib)

# Commands
CD := cd
NPM := npm

JAVA := java
JAVA_RHINO := $(JAVA) \
	-cp $(PATH_RHINO_JAR) \
	-DNODESCHNAPS_PATH=$(NODESCHNAPS_PATH)

.PHONY: test

all: help

help:
	# Help:
	# 	install		Install the project.
	# 	test		Run the tests.

install:
	$(NPM) install

test:
	########################################
	# START TESTING
	# NODESCHNAPS_PATH: $(NODESCHNAPS_PATH)
	########################################
	@$(CD) $(PATH_TEST) \
		&& $(JAVA_RHINO) \
			org.mozilla.javascript.tools.shell.Main \
			test.rhino.js
