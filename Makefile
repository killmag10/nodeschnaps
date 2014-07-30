DEPPENDENCY_NODE_VERSION := 0.10.29

# Paths
PATH_TEST := test
PATH_DEPS := deps
PATH_NODE_MODULES := node_modules

PATH_RHINO_JAR := $(shell readlink -f $(PATH_DEPS)/rhino/js.jar)
NODESCHNAPS_PATH := $(shell readlink -f lib)

# Commands
CD := cd
MV := mv
NPM := npm
WGET := wget
TAR := tar
NODE := node

JAVA := java
JAVA_RHINO := $(JAVA) \
	-cp $(PATH_RHINO_JAR) \
	-DNODESCHNAPS_PATH=$(NODESCHNAPS_PATH)

.PHONY: \
	all \
	help \
	install \
	uninstall \
	test \
	.installDependencyNodeSource

all: help

help:
	########################################
	# Help:
	#	help		Show the help.
	# 	install		Install the project.
	#	uninstall	Uninstall the project.
	# 	test		Run the tests.
	########################################

install: .installDependencyNodeSource

installComplete: install
	# Install npm packages
	@$(NPM) install	

uninstall:
	# Remove $(PATH_DEPS)/node
	@$(RM) -r $(PATH_DEPS)/node

uninstallComplete: uninstall
	# Remove $(PATH_NODE_MODULES)/
	@$(RM) -r $(PATH_NODE_MODULES)/*

test:
	########################################
	# START TESTING
	# NODESCHNAPS_PATH: $(NODESCHNAPS_PATH)
	########################################
	@$(CD) $(PATH_TEST) \
		&& $(JAVA_RHINO) \
			org.mozilla.javascript.tools.shell.Main \
			test.rhino.js

testNode:
	########################################
	# START TESTING in Node
	########################################
	@$(CD) $(PATH_TEST) \
		&& $(NODE) test.node.js

.installDependencyNodeSource: $(PATH_DEPS)/node

# Paths

$(PATH_DEPS)/node:
	# Install nodejs source
	@$(WGET) -O - 'http://nodejs.org/dist/v$(DEPPENDENCY_NODE_VERSION)/node-v$(DEPPENDENCY_NODE_VERSION).tar.gz' \
		| $(TAR) -xz -C $(PATH_DEPS)/
	@$(MV) $(PATH_DEPS)/node-v$(DEPPENDENCY_NODE_VERSION) $(PATH_DEPS)/node
