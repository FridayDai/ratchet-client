package com.ratchethealth.client

import org.apache.commons.lang.math.NumberUtils

class DateUnitTagLib {

    def convertDays(days, period, unit) {
        def sign = days < 0 ? '-' : '+'
        days = days.abs()
        int count = days / period
        def remainder = days % period
        def trisectorMap = [
                7  : 2,
                30 : 10,
                365: 122
        ]

        if (remainder != 0) {

            if (period == 365 && days % 365 - 1 == 243) {
                remainder = 1
                // only for years.
            } else {
                remainder = ((days % period - 1) / trisectorMap[period]).toInteger() / 2
            }
        }

        //remove 's' of unit, when only count is 1;
        def mixed = count + remainder
        if (mixed < 2) {
            unit = unit.replaceAll(/(\w+)s$/, '$1')
        }

        return [digit: sign + mixed,
                unit : unit]

    }

    def dateUnit = { attrs, body ->

        def date = attrs.var ?: "date"
        def offset = NumberUtils.toLong(attrs.millisecond)
        if (offset == 0) {
            out << body((date): [digit: 0, unit: 'days'])
            return
        }

        int days = offset / (24 * 60 * 60 * 1000)
        def result

        if (days / 7 < 1) {
            result = convertDays(days, 1, 'days')
        } else if (days / 30 < 1) {
            result = convertDays(days, 7, 'weeks')
        } else if (days / 365 < 1) {
            result = convertDays(days, 30, 'months')
        } else {
            result = convertDays(days, 365, 'years')
        }

        out << body((date): result)

    }
}
