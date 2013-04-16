echo:
	@echo "\n============================"
	@echo "Make some happy little trees"
	@echo "============================\n"
	@mkdir -p public/css
	@lessc --compress --verbose ./less/happytrees.less public/css/happytrees.min.css
	@lessc --compress --verbose ./less/style.less public/css/style.min.css
	@echo "\n==========================="
	@echo "Well, now wasn't that nice!"
	@echo "===========================\n"

clean:
	rm -r public/css

css: css/*.css

css/*.css: less/*.less
	@echo "\n================================"
	@echo "Make some happy little css files"
	@echo "================================\n"
	@say "building your stylesheet"
	@mkdir -p public/css
	@lessc --compress --verbose ./less/happytrees.less public/css/happytrees.min.css
	@lessc --compress --verbose ./less/style.less public/css/style.min.css
	@say "has finished successfully"
	@echo "\n==========================="
	@echo "Well, now wasn't that nice!"
	@echo "===========================\n"

watch:
	echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make css' }"

.PHONY:
	css watch