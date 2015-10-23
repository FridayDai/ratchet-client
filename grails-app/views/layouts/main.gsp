<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><g:layoutTitle default="Grails"/></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="${createLinkTo(dir: 'images', file: 'favicon.png')}" type="image/x-icon"/>
    <link rel="apple-touch-icon" href="${assetPath(src: 'apple-touch-icon.png')}">
    <link rel="apple-touch-icon" sizes="114x114" href="${assetPath(src: 'apple-touch-icon-retina.png')}">
    <!--[if lte IE 8]><asset:stylesheet src="css/ie.css"/><![endif]-->
    <g:if test="${cssPath}">
        <asset:stylesheet src="css/pages/${cssPath}"/>
    </g:if>
    <g:layoutHead/>
</head>

<body>
<g:render template="/shared/updateBrowser" />
<g:render template="/shared/announcement" />
<g:render template="/shared/header" />
<g:render template="/shared/nav" />
<input type="hidden" id="back-button-flag" value="no">
<div class="container" id="main">
    <g:layoutBody/>
</div>
<g:render template="/shared/footer" />

<g:if test="${commonScriptPath}">
    <asset:javascript src="${commonScriptPath}"/>
</g:if>

<g:if test="${scriptPath}">
    <asset:javascript src="${scriptPath}"/>
</g:if>

<g:else>
    <asset:javascript src="bundles/defaultBundle"/>
</g:else>

<g:render template="/shared/googleAnalytics" />
</body>
</html>
