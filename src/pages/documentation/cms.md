---
title: Decap CMS
subtitle: Install decam CMS setp by step
layout: base.njk
ismarkdown: true
---

## Decap CMS

[Decap CMS](https://decapcms.org/) is a CMS for static site generators that is firstly created to be hosted by Netifly. It offers a clean interface to create and edit pages that are still saved with git.

Decap CMS is a [single-page app](https://github.com/decaporg/decap-cms?tab=readme-ov-file) that is pulled in the /admin part of this starter kit. Nevertheless, you will need to go through a few steps before you can take advantage of it.

### Create OAuth Application

Go to the [Github OAuth settings](https://github.com/settings/applications/new) from *Settings* > *Developer Settings* > *OAuth Apps* > *Generate New*.

Fill *Homepage URL* with the the url of where you will install your external OAuth client. *Authorization callback URL* will get the same url followed by 'callback' `https://example.com/callback`.

Then hit [Register application].

On the next step you will have to create your client Sectet (CLIENT_SECRET) and save it in a secure file. Save also the Client ID (CLIENT_ID).

### Deploy an external OAuth client

In Netify you can set up all you need for decap CMS and your site but you can also use deploy your own external OAuth client. Decap documentation has [referenced a list](https://decapcms.org/docs/external-oauth-clients/).

I chose the [PHP Netlify CMS GitHub Oauth](https://github.com/mcdeck/netlify-cms-oauth-provider-php) that comes with [a blogpost](https://www.van-porten.de/blog/2021/01/netlify-auth-provider/) detailing how you can use it on a small hosting server.


```bash
git clone https://github.com/mcdeck/netlify-cms-oauth-provider-php
cd netlify-cms-oauth-provider-php
composer install
```

You will then have to copy the `.env` file into a new `.env.local` where you will add the CLIENT_ID and CLIENT_SECRET of your OAuth Application as follows:

```
OAUTH_PROVIDER=github
...
OAUTH_CLIENT_ID=CLIENT_ID
OAUTH_CLIENT_SECRET=CLIENT_SECRET
REDIRECT_URI=https://example.com/callback
ORIGIN=https://example.com
```

You will then have to upload everything to your server and make sure you set the document root of your server in the `public` directory. 

The index page of your site should read "Hello, Log in with Github".

### Install the CMS

The CMS is already installed in the `_assets/public/admin`. The index.html is the page that will load the CMS application.

The other file config.yml needs some setup. You will need to update the `base_url:` with the path to the cms oauth provider you just published.

```
base_url: https://auth.xn--4lj4bfp6d.eu.org # Path to ext auth provider
```

You may also change the `media_folder` where all images and media will be uploaded to and also list in `collections` the folders and pages that you want to be editable as well as the field definition for all of them.