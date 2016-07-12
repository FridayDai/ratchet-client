<div role="banner" class="footer" id="footer">
    <div class="content clear">
        <span class="copyright-year pull-left">© 2016</span>
        <div class="copyright pull-left">
            <a href="/" class="logo">
                <img class="footer-logo" src="${assetPath(src: 'footer_logo.png')}">
            </a>
        </div>
        <div class="pull-left">
            <ul>
                <li>All rights reserved.</li>
            </ul>
        </div>
        <g:if test="${request.session.token}">
        <div class="assist-me">
            <i  class="fa fa-question-circle"></i> Assist me
        </div>

        <form action="/assist-me" method="post" id="assist-form" class="assist-form ui-hidden" name="assist-form" novalidate="novalidate">
            <div class="form-group title">
                <label class="lbl-group">TITLE<span>*</span></label>
                <input id="assist-title" name="title" type="text" class="input-group title"
                       placeholder="Please assist me on this" required/>
            </div>

            <div class="form-group">
                <label class="lbl-group">DESCRIPTION<span>*</span></label>
                <textarea id="assist-desc" name="desc" type="text" class="input-group description"
                          placeholder="Description here" required></textarea>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">NAME<span>*</span></label>
                <label class="lbl-input" id="assist-full-name" data-first="${request.session.firstName}"
                       data-last="${request.session.lastName}">
                    <g:if test="${request.session.isDoctor == true}">Dr.</g:if> ${request.session.firstName} ${request.session.lastName}</label>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">EMAIL<span>*</span></label>
                <label class="lbl-input" id="assist-email">${request.session.email}</label>
            </div>

            <div class="form-group required required-width"><span>*</span>Required field</div>

            <div class="align-center assist-tip">
            </label>We will respond to you as soon as we can!</label>
            </div>
        </form>
        </g:if>
    </div>
</div>
