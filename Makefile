zip:
	rm -f linkedin-madlibs-trmnl.zip
	cd src && zip -q ../linkedin-madlibs-trmnl.zip settings.yml *.liquid

.PHONY: zip
