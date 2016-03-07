package com.ratchethealth.client

import java.text.SimpleDateFormat


class Utils {
    static formatBirthday(dateStr) {
        if (!dateStr) {
            return ''
        }

        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone('America/Vancouver'))

        SimpleDateFormat sd1 = new SimpleDateFormat("d-MMM-yy")

        cal.clear()

        cal.setTime(sd1.parse(dateStr))

        SimpleDateFormat sd = new SimpleDateFormat("MMM d'th', yyyy")

        return sd.format(cal.time)
            .replace("1th", "1st")
            .replace("2th", "2nd")
            .replace("3th", "3rd")
    }
}
