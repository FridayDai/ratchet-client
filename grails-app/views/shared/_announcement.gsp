<g:set var="announcementService" bean="announcementService" />
<g:set var="announcement" value="${announcementService.checkAnnouncement()}" />
<g:if test="${announcement && session.announcementLastUpdated != announcement.lastUpdated.toString()}">
	<div role="banner" class="maintenance" data-announcement-last-updated="${announcement.lastUpdated}" id="maintenance" style="background-color: ${announcement.colorHex?:'#fadedd'}">
		<div class="maintenance-content"><span class="maintenance-attention">Attention:</span> <span>${announcement.content}</span></div>
		<span id="maintenance-close" class="maintenance-btn-close">X</span>
	</div>
</g:if>
