# techskitchen
Tech's Kitchen Responsive Website

This is the web app component of Tech's Kitchen.

It includes the Node.js API engine as well as front end.

NB: REST API is made available via Apache ProxyPass:
ProxyRequests off

<Proxy *>
      Order deny,allow
      Allow from all
</Proxy>

<Location /node>
      ProxyPass http://HOSTNAME:3000
      ProxyPassReverse http://HOSTNAME:3000
</Location>
