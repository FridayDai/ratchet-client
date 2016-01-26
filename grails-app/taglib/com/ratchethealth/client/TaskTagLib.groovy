package com.ratchethealth.client

class TaskTagLib {

    def renderTemplate(scores, Map tool = [:]) {
        def body = scores.body
        def scoreList = scores.scoreString.split(',')
        def padding = scores.autoPadding ? 'row-'+ scoreList.size() + '-padding' : ''

        for (single in scoreList) {
            def scoreMap = single.split(':')

            if (scoreMap.size() > 1) {
                def name = scoreMap[0]

                if (tool[name]) {
                    scoreMap[0] = tool[name]
                }
            } else {
                scoreMap = ["result", 0]
            }

            out << body((scores.score): scoreMap, (scores.autoPadding): padding)
        }
    }

    def multipleScore = { attrs, body ->
        def scoreString = attrs.in
        def taskType = attrs.type

        if (scoreString) {
            out << ''
        }

        def scores = [
                "scoreString"  : scoreString,
                "score"      : attrs.var ?: "score",
                "body"       : body,
                "autoPadding": attrs.padding
        ]

        switch (RatchetConstants.TOOL_TYPE[taskType]) {
            case RatchetConstants.TOOL_NAME_NRS_BACK:
            case RatchetConstants.TOOL_NAME_NRS_NECK:

                renderTemplate(scores, StatusCodeConstants.TASK_NRS_SCORE)
                break
            case RatchetConstants.TOOL_NAME_HOOS:
            case RatchetConstants.TOOL_NAME_KOOS:

                renderTemplate(scores, StatusCodeConstants.TASK_OOS_SCORE)
                break
            case RatchetConstants.TOOL_NAME_HOOS_JR:
            case RatchetConstants.TOOL_NAME_KOOS_JR:

                renderTemplate(scores, StatusCodeConstants.TASK_OOS_JR_SCORE_LABEL)
                break
            case RatchetConstants.TOOL_NAME_FAIRLEY_NASAL_SYMPTOM:

                renderTemplate(scores, StatusCodeConstants.TASK_FAIRLEY_NASAL_SCORE_LABEL)
                break

            default:
                renderTemplate(scores)
        }
    }
}
