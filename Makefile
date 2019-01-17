NODESCHNAPS_DEPPENDENCY_NODE_DIST_URL ?= https://nodejs.org/dist/
NODESCHNAPS_DEPPENDENCY_NODE_VERSION := 0.12.18

# Paths
PATH_TEST := test
PATH_DEPS := deps
PATH_NODE_MODULES := node_modules
PATH_DOCS := docs

PATH_RHINO_JAR := $(shell readlink -f $(PATH_DEPS)/rhino/lib/rhino-1.7.9.jar)
NODESCHNAPS_PATH := $(shell readlink -f lib)

# A test value for env tests
TEST_VAR := 123 test -
TEST_TEMP_PATH := $(shell readlink -f temp)
TEST_RESOURCE_PATH := $(shell readlink -f test/resource)

export TEST_VAR
export TEST_TEMP_PATH
export TEST_RESOURCE_PATH

TEST_DIRS := test/lib
TEST_FILES := $(shell find $(TEST_DIRS) -type f -name '*.js')

# Macros
EXISTS_DOCS = $(shell $(TEST) -d $(PATH_DOCS)/html && printf '1')

# Commands
CD := cd
MV := mv
NPM := npm
WGET := wget
TAR := tar
NODE := node
TEST := test
MKDIR := mkdir

JAVA := java
JAVA_RHINO := $(JAVA) \
	-DNODESCHNAPS_PATH=$(NODESCHNAPS_PATH) \
	-cp $(PATH_RHINO_JAR)
JAVA_NASHORN := jjs --language=es5 -DNODESCHNAPS_PATH=$(NODESCHNAPS_PATH)

.PHONY: \
	all \
	help \
	install \
	uninstall \
	test \
	.installDependencyNodeSource \
	$(TEST_FILES)

all: help

help:
	########################################
	# Help:
	#	help		Show the help.
	# 	install		Install the project.
	#	uninstall	Uninstall the project.
	# 	test		Run the tests.
	########################################

npmInstall: .installDependencyNodeSource .setupFolders

install: npmInstall
	# Install npm packages
	@$(NPM) install

npmUninstall:
	# Remove $(PATH_DEPS)/node
	@$(RM) -r $(PATH_DEPS)/node

uninstall: npmUninstall
	# Remove $(PATH_NODE_MODULES)/
	@$(RM) -r $(PATH_NODE_MODULES)/*

clean: distclean

distclean: .cleanHtml


test: testRhino testNashorn

$(TEST_FILES):
	@$(MAKE) $(@:%=testRhino/%)  $(@:%=testNashorn/%)

$(TEST_FILES:%=testRhino/%):
	# Test Rhino
	$(CD) $(PATH_TEST) \
		&& $(JAVA_RHINO) \
			-DTEST_FILE='$(@:testRhino/test/%=%)' \
			org.mozilla.javascript.tools.shell.Main \
			test.rhino.js

$(TEST_FILES:%=testNashorn/%):
	# Test Nashorn
	$(CD) $(PATH_TEST) \
		&& $(JAVA_NASHORN) \
			-DTEST_FILE='$(@:testNashorn/test/%=%)' \
			test.nashorn.js

devTest:
	########################################
	# START DEVELOPMENT TESTING SCRIPT
	# NODESCHNAPS_PATH: $(NODESCHNAPS_PATH)
	########################################
	$(CD) $(PATH_TEST) \
		&& $(JAVA_RHINO) \
			org.mozilla.javascript.tools.shell.Main \
			development.rhino.js

testRhino:
	########################################
	# START TESTING in Rhino
	# NODESCHNAPS_PATH: $(NODESCHNAPS_PATH)
	########################################
	$(CD) $(PATH_TEST) \
		&& $(JAVA_RHINO) \
			org.mozilla.javascript.tools.shell.Main \
			test.rhino.js

testNashorn:
	########################################
	# START TESTING in Nashorn
	# NODESCHNAPS_PATH: $(NODESCHNAPS_PATH)
	########################################
	$(CD) $(PATH_TEST) \
		&& $(JAVA_NASHORN) test.nashorn.js

testNode:
	########################################
	# START TESTING in Node
	########################################
	@$(CD) $(PATH_TEST) \
		&& $(NODE) test.node.js

html: .cleanHtml
	# Create html docs under docs/html/api
	@$(PATH_NODE_MODULES)/.bin/jsdoc \
		--destination $(PATH_DOCS)/html/api \
		--recurse \
		lib/

.cleanHtml:
ifeq ($(EXISTS_DOCS),1)
	# Remove html docs
	@$(TEST) ! -d $(PATH_DOCS)/html || $(RM) -r $(PATH_DOCS)/html
endif

.setupFolders:
	# Create test temp directory.
	@$(TEST) -d "$$TEST_TEMP_PATH" || $(MKDIR) "$$TEST_TEMP_PATH"

.installDependencyNodeSource: $(PATH_DEPS)/node

# Paths

$(PATH_DEPS)/node:
	# Install nodejs source
	@$(WGET) -O - '$(NODESCHNAPS_DEPPENDENCY_NODE_DIST_URL)v$(NODESCHNAPS_DEPPENDENCY_NODE_VERSION)/node-v$(NODESCHNAPS_DEPPENDENCY_NODE_VERSION).tar.gz' \
		| $(TAR) -xz -C $(PATH_DEPS)/
	@$(MV) $(PATH_DEPS)/node-v$(NODESCHNAPS_DEPPENDENCY_NODE_VERSION) $(PATH_DEPS)/node
