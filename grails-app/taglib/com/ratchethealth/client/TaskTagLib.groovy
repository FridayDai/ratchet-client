package com.ratchethealth.client

class TaskTagLib {

    def scoreTemplate(name, number, padding) {
        def html = '<span class="score" style="padding: 0 ' + padding + 'px">' +
                '<div class="score-number">' + number + '</div>' +
                '<div class="score-label">' + name + '</div>' +
                '</span>'
        return html
    }

    def renderTemplate(scoreList, padding, Map tool = [:]) {
        def name = "result"
        def number = 0

        for (score in scoreList) {
            def scoreMap = score.split(':')

            if (scoreMap.size() > 1) {
                name = scoreMap[0]
                number = scoreMap[1]

                if (tool[name]) {
                    name = tool[name]
                }
            }

            out << scoreTemplate(name, number, padding)
        }
    }

    def multipleScore = { attrs, body ->
        def scoreString = attrs.score
        def taskType = attrs.type

        if (scoreString) {
            out << ''
        }

        def scoreList = scoreString.split(',')
        def padding = -8 * scoreList.size() + 46

        switch (RatchetConstants.TOOL_TYPE[taskType]) {
            case RatchetConstants.TOOL_NAME_NRS_BACK:
            case RatchetConstants.TOOL_NAME_NRS_NECK:

                renderTemplate(scoreList, padding, StatusCodeConstants.TASK_NRS_SCORE)
                break
            case RatchetConstants.TOOL_NAME_HOOS:
            case RatchetConstants.TOOL_NAME_KOOS:

                renderTemplate(scoreList, padding, StatusCodeConstants.TASK_OOS_SCORE)
                break
            case RatchetConstants.TOOL_NAME_HOOS_JR:
            case RatchetConstants.TOOL_NAME_KOOS_JR:

                renderTemplate(scoreList, padding, StatusCodeConstants.TASK_OOS_JR_SCORE_LABEL)
                break
            case RatchetConstants.TOOL_NAME_FAIRLEY_NASAL_SYMPTOM:

                renderTemplate(scoreList, padding, StatusCodeConstants.TASK_FAIRLEY_NASAL_SCORE_LABEL)
                break

            default:
                renderTemplate(scoreList, padding)
        }
    }
}
