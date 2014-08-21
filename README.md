WEBATLAS – High quality web maps from proprietary to Open Source
========================

Demo: http://norkart.github.io/webatlas-foss4g-showcase/ 


**Facts:**

-	WEBATLAS is a collection  of geographical related data – collected, analyzed, organized and made available to end users as raw data, web services or customized products.
-	WEBATLAS is developed and maintained by Norkart – Norways leading GIS company established as early as 1961.
-	Topographic maps served as WMS or TMS is the backbone of WEBATLAS.
-	WEBATLAS established in 2006 – approx 10 mill hits annually.
-	2014 – estimated 1.5 billion hits. 
-	Directory service (1881.no) and property sales(Finn.no) the biggest clients along with several public sector departments. 
-	Covers Norway with highly detailed and accurate maps – OSM used in the rest of Europe.

**Situation 2006 – 2013:**

-	WEBATLAS powered by in-house developed WMS server and TMS.
-	All mapdata in Norway subject to fees and taxation based on use – a little nightmare to administrate. 
-	Rapid growth a challenge to stability and performance. 

**2013 – 2014:**

-	Norwegian Mapping Authority releases a lot of products. Maps that become freely available includes:
o	Topographic maps covering scales 1:50000 and up
o	Road data from Norwegian Public Roads Administration
o	Nautical charts 
o	Place names
o	Administrative borders
o	DTM
-	This made administration easier and cheaper – to the benefit of our clients 
-	After successful operation on OSM data in Europe the last two years:
o	Postgis replaced the old WMS – server’s file based system 
o	Geoserver replaced the old WMS server
o	Mapproxy replaced the old tile server
-	After ½ year in operation, we’ve got rid of most hickups and are faster and more stable than ever. 

During the entire period, a separate WMS specially design to handle raster data quickly has been in operation. This one is also largely based on OpenSource. Unfortunately, ortophoto is still subject to heavy fees.  

Please note that the most detailed data such as cadastre, buildings etc is still not free.  
