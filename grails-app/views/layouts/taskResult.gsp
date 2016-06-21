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
    <link rel="shortcut icon" href="${createLinkTo(dir: 'images', file: 'favicon.png', absolute: true)}" type="image/x-icon"/>
    <link rel="apple-touch-icon" href="${assetPath(src: 'apple-touch-icon.png', absolute: true)}">
    <link rel="apple-touch-icon" sizes="114x114" href="${assetPath(src: 'apple-touch-icon-retina.png', absolute: true)}">
    <!--[if lte IE 8]><asset:stylesheet src="css/ie.css"/><![endif]-->
    <g:if test="${!download}">
        <g:if test="${cssPath}">
            <link rel="stylesheet" href="${assetPath(src: "css/pages/${cssPath}", absolute: true)}" media="screen" />
        </g:if>
        <g:if test="${printSheetPath}">
            <link rel="stylesheet" href="${assetPath(src: "css/pages/${printSheetPath}", absolute: true)}" media="print" />
        </g:if>
    </g:if>
    <g:else>
        <link rel="stylesheet" href="${assetPath(src: "css/pages/${printSheetPath}", absolute: true)}" media="screen" />
    </g:else>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <g:layoutHead/>
</head>

<body>
<g:render template="/shared/task_header" />
<div class="container" id="main">
    <g:layoutBody/>
</div>

<g:if test="${commonScriptPath}">
    <asset:javascript src="${commonScriptPath}"/>
</g:if>

<g:if test="${scriptPath}">
    <asset:javascript src="${scriptPath}"/>
</g:if>
</body>
</html>
