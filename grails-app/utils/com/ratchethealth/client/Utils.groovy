package com.ratchethealth.client

import java.text.SimpleDateFormat


class Utils {
    static formatBirthday(ms) {
        if (!ms) {
            return ''
        }

        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone('America/Vancouver'))

        cal.clear()

        cal.setTimeInMillis(ms)

        SimpleDateFormat sd = new SimpleDateFormat("MMM d'th', yyyy")

        return sd.format(cal.time)
            .replace("1th", "1st")
            .replace("2th", "2nd")
            .replace("3th", "3rd")
    }
}
